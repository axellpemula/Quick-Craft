


import { BlockPermutation, system } from '@minecraft/server';
import { getCardinalDirection } from './utils.js';

export const MAX_VOLUME = 89000;

export function computeRegion(player, structureId, offsets, structureSizes) {
    const dir = getCardinalDirection(player);
    let size = structureSizes[structureId];
    if (!size) return { error: "No size registered" };
    if (size[dir]) size = size[dir];

    const base = player.location;
    const ox = Math.floor(base.x + offsets.dx);
    const oy = Math.floor(base.y + offsets.dy);
    const oz = Math.floor(base.z + offsets.dz);

    const min = { x: ox, y: oy, z: oz };
    const max = { x: ox + size.w - 1, y: oy + size.h - 1, z: oz + size.l - 1 };

    const volume = size.w * size.h * size.l;
    if (volume > MAX_VOLUME) return { error: `Region too large (${volume})` };

    return { min, max };
}




export function snapshotRegionSync(dim, min, max) {
    const snap = { x: [], y: [], z: [], types: [], states: [], length: 0 };
    
    for (let y = min.y; y <= max.y; y++) {
        if (y < -64 || y > 320) continue;
        for (let z = min.z; z <= max.z; z++) {
            for (let x = min.x; x <= max.x; x++) {
                const b = getSafeBlock(dim, x, y, z);
                if (b) {
                    const typeId = b.permutation.type.id;
                    snap.x.push(x);
                    snap.y.push(y);
                    snap.z.push(z);
                    snap.types.push(typeId);
                    snap.states.push(typeId === 'minecraft:air' ? {} : (b.permutation.getAllStates && b.permutation.getAllStates()) || {});
                    snap.length++;
                }
            }
        }
    }
    return snap;
}





const ENTITY_PADDING = 5;

export function snapshotEntities(dim, min, max) {
    const entityIds = new Set();
    const pad = ENTITY_PADDING;

    const pMin = { x: min.x - pad, y: min.y - pad, z: min.z - pad };
    const pMax = { x: max.x + pad, y: max.y + pad, z: max.z + pad };

    const center = {
        x: (pMin.x + pMax.x) / 2,
        y: (pMin.y + pMax.y) / 2,
        z: (pMin.z + pMax.z) / 2,
    };

    
    const dx = (pMax.x - pMin.x) / 2;
    const dy = (pMax.y - pMin.y) / 2;
    const dz = (pMax.z - pMin.z) / 2;
    const radius = Math.ceil(Math.sqrt(dx * dx + dy * dy + dz * dz)) + 1;

    try {
        const entities = dim.getEntities({
            location: center,
            maxDistance: Math.max(1, radius),
        });
        for (const e of entities) {
            if (e.typeId === 'minecraft:player') continue;
            const p = e.location;
            if (!p) continue;
            if (
                p.x >= pMin.x && p.x <= pMax.x &&
                p.y >= pMin.y && p.y <= pMax.y &&
                p.z >= pMin.z && p.z <= pMax.z
            ) {
                entityIds.add(e.id);
            }
        }
    } catch {}

    return entityIds;
}




export function removeEntitiesInBox(dim, min, max, keepEntityIds = null) {
    const pad = ENTITY_PADDING;

    const pMin = { x: min.x - pad, y: min.y - pad, z: min.z - pad };
    const pMax = { x: max.x + pad, y: max.y + pad, z: max.z + pad };

    const center = {
        x: (pMin.x + pMax.x) / 2,
        y: (pMin.y + pMax.y) / 2,
        z: (pMin.z + pMax.z) / 2,
    };

    const dx = (pMax.x - pMin.x) / 2;
    const dy = (pMax.y - pMin.y) / 2;
    const dz = (pMax.z - pMin.z) / 2;
    const radius = Math.ceil(Math.sqrt(dx * dx + dy * dy + dz * dz)) + 1;

    try {
        const entities = dim.getEntities({
            location: center,
            maxDistance: Math.max(1, radius),
        });

        for (const e of entities) {
            if (e.typeId === 'minecraft:player') continue;

            if (keepEntityIds && keepEntityIds.has(e.id)) continue;

            const p = e.location;
            if (!p) continue;

            if (
                p.x >= pMin.x && p.x <= pMax.x &&
                p.y >= pMin.y && p.y <= pMax.y &&
                p.z >= pMin.z && p.z <= pMax.z
            ) {
                try { e.remove(); } catch {}
            }
        }
    } catch {}
}

export function clearWaterBlocks(dim, min, max) {
    for (let y = min.y; y <= max.y; y++) {
        for (let z = min.z; z <= max.z; z++) {
            for (let x = min.x; x <= max.x; x++) {
                const blk = dim.getBlock({ x, y, z });
                if (!blk) continue;
                const perm = blk.permutation;
                const isWater =
                    (perm?.matches && (perm.matches('minecraft:water') || perm.matches('minecraft:flowing_water'))) ||
                    perm?.type?.id === 'minecraft:water';
                if (isWater) {
                    try { blk.setPermutation(BlockPermutation.resolve('minecraft:air')); } catch {}
                }
            }
        }
    }
}




function getSafeBlock(dim, x, y, z) {
    try {
        return dim.getBlock({ x, y, z });
    } catch {
        return undefined; 
    }
}




export function takeAsyncSnapshot(dim, min, max) {
    return new Promise((resolve) => {
        const snap = { x: [], y: [], z: [], types: [], states: [], length: 0 };
        let cx = min.x;
        let cy = min.y;
        let cz = min.z;

        function processChunk() {
            const start = Date.now();
            
            while (Date.now() - start < 15) {
                if (cy >= -64 && cy <= 320) {
                    const b = getSafeBlock(dim, cx, cy, cz);
                    if (b) {
                        const typeId = b.permutation.type.id;
                        snap.x.push(cx);
                        snap.y.push(cy);
                        snap.z.push(cz);
                        snap.types.push(typeId);
                        snap.states.push(typeId === 'minecraft:air' ? {} : (b.permutation.getAllStates && b.permutation.getAllStates()) || {});
                        snap.length++;
                    }
                }

                cx++;
                if (cx > max.x) {
                    cx = min.x;
                    cz++;
                    if (cz > max.z) {
                        cz = min.z;
                        cy++;
                        if (cy > max.y) {
                            resolve(snap);
                            return;
                        }
                    }
                }
            }
            system.runTimeout(processChunk, 1);
        }
        
        processChunk();
    });
}