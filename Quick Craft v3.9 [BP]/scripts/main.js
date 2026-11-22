

import { world, system, Player } from '@minecraft/server';
import { showCategoryMenu } from './ui.js';

world.afterEvents.itemUse.subscribe((ev) => {
  const { source: player, itemStack } = ev;
  if (!(player instanceof Player)) return;
  if (!itemStack) return;
  if (itemStack.typeId === "dg:hammer") {
    showCategoryMenu(player);
  }
});

world.afterEvents.playerSpawn.subscribe((ev) => {
  system.runTimeout(() => {
    try {
      ev.player.sendMessage("§6§lQuick Craft 3.0 Activated");
      ev.player.sendMessage("§bVisit youtube: @kazuya ");
      ev.player.sendMessage("§bFor Latest Updates & More Mods");
    } catch (e) {
    }
  }, 80);
});
