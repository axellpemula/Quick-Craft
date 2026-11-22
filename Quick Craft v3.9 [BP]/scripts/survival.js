



import { ActionFormData } from '@minecraft/server-ui';
import { structureCosts } from './data/costs.js';
import { spawnWithUndo } from './undo.js';
import { structureSizes } from './data/globals.js';


function getProgress(player, structureId) {
    const raw = player.getDynamicProperty(`dg_prog_${structureId}`);
    return raw ? JSON.parse(raw) : {};
}


function fillList(player, structureId, costs) {
    const container = player.getComponent('inventory').container;
    const progress = getProgress(player, structureId);
    let itemsTaken = false;
    let isComplete = true;

    for (const [itemId, requiredAmount] of Object.entries(costs)) {
        let currentAmount = progress[itemId] || 0;
        let needed = requiredAmount - currentAmount;
        
        if (needed > 0) {
            for (let i = 0; i < container.size; i++) {
                const item = container.getItem(i);
                if (item && item.typeId === itemId) {
                    const take = Math.min(item.amount, needed);
                    
                    if (item.amount === take) {
                        container.setItem(i, undefined);
                    } else {
                        const newItem = item.clone();
                        newItem.amount -= take;
                        container.setItem(i, newItem);
                    }
                    
                    currentAmount += take;
                    needed -= take;
                    itemsTaken = true;
                    if (needed <= 0) break;
                }
            }
        }
        
        progress[itemId] = currentAmount;
        if (currentAmount < requiredAmount) {
            isComplete = false;
        }
    }

    if (itemsTaken) {
        player.playSound('random.levelup', { pitch: 1.5 });
        player.setDynamicProperty(`dg_prog_${structureId}`, JSON.stringify(progress));
    } else {
        player.playSound('note.bass', { pitch: 0.8 });
    }

    
    if (isComplete) {
        player.playSound('random.toast', { pitch: 1.0 });
        player.setDynamicProperty(`dg_unlk_${structureId}`, true);
        player.setDynamicProperty(`dg_prog_${structureId}`, undefined);
    }

    return isComplete;
}






export function showResourceUI(player, structure) {
    const costs = structureCosts[structure.id];
    
    
    if (!costs || Object.keys(costs).length === 0) {
        console.warn(`[Quick Craft] Resource list not added for structure ID: "${structure.id}" (${structure.name})`);
        player.playSound('note.bass', { pitch: 0.6 });
        player.sendMessage(`§c${structure.name} is locked! Required material list has not been added yet.`);
        return;
    }

    const progress = getProgress(player, structure.id);
    let bodyText = `§c${structure.name} is locked!\n§7Fill the required materials below to unlock.\n\n§l§eRequirements:\n`;

    for (const [itemId, requiredAmount] of Object.entries(costs)) {
        const currentAmount = progress[itemId] || 0;
        const cleanName = itemId.replace('minecraft:', '').replace(/_/g, ' ').toUpperCase();
        
        if (currentAmount >= requiredAmount) {
            
            bodyText += `§a- ${cleanName}\n  ↳ ${currentAmount} / ${requiredAmount} (Done)\n`;
        } else {
            
            bodyText += `§c- ${cleanName}\n  ↳ ${currentAmount} / ${requiredAmount}\n`;
        }
    }

    const form = new ActionFormData()
        .title(`§l§6Unlock ${structure.name}`)
        .body(bodyText)
        .button("§2§lFill List (Take from Inv)")
        .button("§c§lBack");

    form.show(player).then((res) => {
        if (res.canceled || res.selection === 1) return;

        if (res.selection === 0) {
            const isFinished = fillList(player, structure.id, costs);
            if (isFinished) {
                player.sendMessage(`§aYou have permanently unlocked the ${structure.name}! Select it from the menu again to build it.`);
            } else {
                showResourceUI(player, structure);
            }
        }
    });
}