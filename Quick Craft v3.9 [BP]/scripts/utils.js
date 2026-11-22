

import { BlockPermutation } from '@minecraft/server';


export function getCardinalDirection(player) {
  let yaw = player.getRotation().y % 360;
  if (yaw < 0) yaw += 360;
  if (yaw >= 315 || yaw < 45) return "South";
  if (yaw >= 45 && yaw < 135) return "West";
  if (yaw >= 135 && yaw < 225) return "North";
  return "East";
}


export function runLoad(player, cmd) {
  try {
    player.runCommand(cmd);
    return true;
  } catch {
    try { player.sendMessage("§cFailed to load structure."); } catch {}
    return false;
  }
}


export function resolvePermutation(typeId, states = {}) {
  try {
    return BlockPermutation.resolve(typeId, states);
  } catch {
    return BlockPermutation.resolve("minecraft:air");
  }
}
