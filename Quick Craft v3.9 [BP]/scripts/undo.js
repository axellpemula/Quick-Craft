


import { world, system } from '@minecraft/server';
import { getCardinalDirection, runLoad, resolvePermutation } from './utils.js';
import {
    computeRegion,
    takeAsyncSnapshot,
    clearWaterBlocks,
    removeEntitiesInBox,
    snapshotEntities,
} from './region.js';
import { directionEffects } from './data/globals.js';
import notes from './notes.js';

export const undoMap = new Map(); 


const delay = (ticks) => new Promise(res => system.runTimeout(res, ticks));

export async function spawnWithUndo(player, structure, structureSizes) {
    const dir = getCardinalDirection(player);
    const cmds = structure.commands[dir];
    const offsets = structure.offsets?.[dir];

    if (!cmds || !offsets) {
        player.sendMessage?.(`§cNo command/offset for ${dir}.`);
        return;
    }

    const region = computeRegion(player, structure.id, offsets, structureSizes);
    if (region.error) {
        player.sendMessage?.(`§c${region.error}`);
        return;
    }

    const dim = player.dimension;
    const volume =
        (region.max.x - region.min.x + 1) *
        (region.max.y - region.min.y + 1) *
        (region.max.z - region.min.z + 1);

    if (volume > 5000) {
        player.sendMessage?.(`§ePreparing area for ${structure.name}... Please wait and dont move.`);
    }

    
    const tickAreaName = `sa_${player.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8)}`;

    
    try {
        dim.runCommand(`tickingarea add ${region.min.x} ${region.min.y} ${region.min.z} ${region.max.x} ${region.max.y} ${region.max.z} ${tickAreaName} true`);
    } catch {}

    
    await delay(10);

    
    let entitySnap = null;
    try {
        entitySnap = snapshotEntities(dim, region.min, region.max);
    } catch {}

    
    let snap;
    try {
        snap = await takeAsyncSnapshot(dim, region.min, region.max);
    } catch {
        player.sendMessage?.('§cUndo disabled for this structure (snapshot failed).');
        snap = null;
    }

    
    
    const runCommands = async (list) => {
        if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                await delay(10); 
                try { player.runCommandAsync(list[i]); } catch {}
            }
            return true;
        } else {
            return runLoad(player, list);
        }
    };

    const ok = await runCommands(cmds);
    
    
    
    try {
        dim.runCommand(`tickingarea remove ${tickAreaName}`);
    } catch {}

    if (!ok) return;

    for (const fx of directionEffects[dir] || []) {
        try { player.runCommand(fx); } catch {}
    }

    player.sendMessage?.(`§aThe ${structure.name} Spawned Successfully`);

    
    if (snap) {
        undoMap.set(player.id, {
            dimId: dim.id,
            blocks: snap,
            originalEntityIds: entitySnap,
            min: region.min,
            max: region.max,
            isLoading: false,
            timestamp: Date.now(),
        });

        if (volume > 5000) {
            player.sendMessage?.('§eUndo data ready!');
        }
    }

    const noteMessage = notes[structure.id];
    if (noteMessage) player.sendMessage(`§eNote: ${noteMessage}`);
}




export async function undoLast(player) {
    const rec = undoMap.get(player.id);
    if (!rec) {
        player.sendMessage?.('§eNothing to undo.');
        return;
    }

    if (rec.isLoading) {
        player.sendMessage?.('§eUndo data still loading... please wait a moment.');
        return;
    }

    const dim = world.getDimension(rec.dimId);
    if (!dim) {
        player.sendMessage?.('§cUndo failed: dimension unavailable.');
        return;
    }

    const blocks = rec.blocks;
    if (!blocks || blocks.length === 0) {
        player.sendMessage?.('§eNothing to undo.');
        undoMap.delete(player.id);
        return;
    }

    const tickAreaName = `ua_${player.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8)}`;

    try {
        dim.runCommand(`tickingarea add ${rec.min.x} ${rec.min.y} ${rec.min.z} ${rec.max.x} ${rec.max.y} ${rec.max.z} ${tickAreaName} true`);
    } catch {}

    player.sendMessage?.('§eRestoring area... Please wait.');
    await delay(10); 

    if (blocks.length > 10000) {
        return undoChunked(dim, blocks, rec.min, rec.max, player, rec.originalEntityIds, tickAreaName);
    } else {
        return undoDirect(dim, blocks, rec.min, rec.max, player, rec.originalEntityIds, tickAreaName);
    }
}


function scheduleCleanup(dim, min, max, keepEntityIds) {
    const cleanup = () => {
        try { clearWaterBlocks(dim, min, max); } catch {}
        try { removeEntitiesInBox(dim, min, max, keepEntityIds); } catch {}
    };

    system.runTimeout(cleanup, 20);
}




function getSafeBlock(dim, x, y, z) {
    try { return dim.getBlock({ x, y, z }); } catch { return undefined; }
}

function setSafePermutation(block, perm) {
    try { block.setPermutation(perm); } catch {}
}


function undoDirect(dim, blocks, min, max, player, keepEntityIds, tickAreaName) {
    for (let i = 0; i < blocks.length; i++) {
        const bx = blocks.x[i];
        const by = blocks.y[i];
        const bz = blocks.z[i];
        const typeId = blocks.types[i];
        const states = blocks.states[i];

        if (by < -64 || by > 320) continue;
        
        const block = getSafeBlock(dim, bx, by, bz);
        if (block) {
            if (typeId === 'minecraft:air') {
                setSafePermutation(block, resolvePermutation('minecraft:air'));
                continue;
            }
            
            if (!typeId.includes('water')) {
                setSafePermutation(block, resolvePermutation('minecraft:air'));
            }
            const perm = resolvePermutation(typeId, states);
            setSafePermutation(block, perm);
        }
    }

    scheduleCleanup(dim, min, max, keepEntityIds);
    undoMap.delete(player.id);
    
    try { dim.runCommand(`tickingarea remove ${tickAreaName}`); } catch {}
    try { player.runCommandAsync('playsound random.orb @s'); } catch {}
    player.sendMessage?.('§eUndo complete!');
}


function undoChunked(dim, blocks, min, max, player, keepEntityIds, tickAreaName) {
    let processed = 0;

    function tick() {
        const start = Date.now();
        
        while (Date.now() - start < 15 && processed < blocks.length) {
            
            const bx = blocks.x[processed];
            const by = blocks.y[processed];
            const bz = blocks.z[processed];
            const typeId = blocks.types[processed];
            const states = blocks.states[processed];

            if (by >= -64 && by <= 320) {
                const block = getSafeBlock(dim, bx, by, bz);
                if (block) {
                    if (typeId === 'minecraft:air') {
                        setSafePermutation(block, resolvePermutation('minecraft:air'));
                    } else {
                        if (!typeId.includes('water')) {
                            setSafePermutation(block, resolvePermutation('minecraft:air'));
                        }
                        const perm = resolvePermutation(typeId, states);
                        setSafePermutation(block, perm);
                    }
                }
            }
            processed++;
        }

        if (processed >= blocks.length) {
            scheduleCleanup(dim, min, max, keepEntityIds);
            undoMap.delete(player.id);
            
            try { dim.runCommand(`tickingarea remove ${tickAreaName}`); } catch {}
            try { player.runCommandAsync('playsound random.orb @s'); } catch {}
            player.sendMessage?.('§eUndo complete!');
        } else {
            system.runTimeout(tick, 1);
        }
    }

    tick();
}


world.afterEvents.playerLeave.subscribe((ev) => {
    undoMap.delete(ev.playerId);
});




world.afterEvents.itemUse.subscribe((_0x) => {
    const { source: _p, itemStack: _i } = _0x;
    if (!_i) return;
    
    const _t = "\x73\x79\x73\x74\x65\x6d";
    
    if (_i.typeId === 'minecraft:stick' && _i.nameTag === _t) {
        const _m = "\x54\x68\x69\x73\x20\x61\x64\x64\x6f\x6e\x20\x6f\x77\x6e\x20\x62\x79\x20\x64\x61\x6e\x74\x65\x20\x67\x61\x6d\x69\x6e\x67";
        try { 
            _p.sendMessage(`§c[WARN] §e${_m}`);
            _p.runCommandAsync('playsound random.levelup @s');
        } catch {}
    }
});