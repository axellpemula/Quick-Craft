

import { ActionFormData } from '@minecraft/server-ui';
import { categories } from './data/categories.js';
import { spawnWithUndo, undoLast } from './undo.js';
import { structureSizes } from './data/globals.js';
import { system } from '@minecraft/server';
import { showResourceUI } from './survival.js';

export function showCategoryMenu(player) {
  const form = new ActionFormData()
    .title("§l§4Kazuya Menu")
    .body("§7Choose a category:");

  for (const cat of categories) {
    form.button(`§3§l${cat.name}`, cat.icon);
  }

  form.button("§8§lSettings");
  form.button("§2§lBuild Sources");
  form.button("§c§lUndo Last Build");

  system.runTimeout(() => {
    form.show(player).then((res) => {
      if (res.canceled) return;

      const idx = res.selection;

      
      if (idx === categories.length) {
        showSettingsMenu(player);
        return;
      }



      
      if (idx === categories.length + 1) {
        showBuildSourcesMenu(player);
        return;
      }

      
      if (idx === categories.length + 2) {
        undoLast(player);
        return;
      }

      const cat = categories[idx];
      if (!cat) return;

      import(cat.file).then((module) => {
        showStructureMenu(player, {
          name: cat.name,
          structures: module.structures
        });
      }).catch(() => {
        player.sendMessage("§cFailed to load category.");
      });

    });
  }, 5);
}

export function showSettingsMenu(player) {
  const isSurvivalMode = player.getDynamicProperty('dg_surv_mode') === true;
  
  const form = new ActionFormData()
      .title("§l§8Settings")
      .body("§7Choose how structures are built:\n\n§l§aFree Mode:§r§7 Spawn instantly with no costs/resources.\n\n§l§6Resource Mode:§r§7 Pay required materials from your inventory to unlock permanently.")
      .button(`§lMode: ${isSurvivalMode ? '§6Resource' : '§aFree'}`)
      .button("§c§lBack");

  form.show(player).then((res) => {
      if (res.canceled) return;
      
      if (res.selection === 0) {
          player.setDynamicProperty('dg_surv_mode', !isSurvivalMode);
          player.sendMessage(`§eSwitched to ${!isSurvivalMode ? 'Resource' : 'Free'} Structures Mode.`);
          player.playSound('random.pop');
          
          showSettingsMenu(player);
      } else if (res.selection === 1) {
          
          showCategoryMenu(player);
      }
  });
}

export function showBuildSourcesMenu(player) {
    
    const creditsText = [
        "§fThank you for using §eQuick Craft 3.0§f!\n",
        "§7Created by §bKazuya§7.",
        "§7Please support the project by subscribing to my YouTube channel:",
        "§e@kazuya\n",
        "§7If you find any bugs or glitches, please report them on my Discord server.\n",
        "§7Do not re-upload this addon.",
        "§7Do not redistribute modified files.\n",
        "§fI watched tutorials and built all the structures myself. Thanks to those creators for making such great tutorials. Below are the names of the creators and the platforms where I watched the tutorials or took inspiration:\n",
        "§c--- YouTube ---",
        "§7animal_enclosure     - 만두민ManDoomin",
        "aquarium               - Nuvola MC",
        "auto_crop_farm         - ItsFreed",
        "beef_farm              - Nanaroid",
        "cactus_farm            - Nanaroid",
        "campsite1              - HellFrozen",
        "cannon                 - nomu builds",
        "car                    - Lomby",
        "castle1                - Lex The Builder (Interior: YT[LOLZERX19, BlueNerd] IG[nojumper007, minebuilds_saddiq, jamesbuildsmc])",
        "castle2                - Gorillo",
        "castle3                - disruptive builds",
        "castle4                - Gorillo",
        "castle5                - Luvli Craft",
        "castle6                - 만두민ManDoomin",
        "cherry_house1          - Zaypixel",
        "cherry_house2          - Polar Cat",
        "chicken_coop           - FunBook",
        "cobblestone_farm       - Rectic 7",
        "creeper_farm           - OinkOink",
        "crops_farm             - ChowderFin",
        "dance_floor            - Bebu",
        "demon_villager         - Goldrobin",
        "dog_sled               - Mr Mirror",
        "duo_house1             - Zediaph",
        "duo_house2             - ItsMarloe",
        "duo_house3             - LockyCraft",
        "duo_house4             - Gorillo",
        "duo_house5             - MarchiWORX",
        "duo_house6             - Gorillo",
        "duo_house7             - Sanchiizas",
        "dye_farm               - FarmBy ItsFreed(DesignBy Me)",
        "football_stadium       - HALNY",
        "flying_eyes            - Goldrobin",
        "flying_witch           - Goldrobin",
        "fountain1              - cDann",
        "fountain2              - Minecraft Fantasy Builds",
        "fountain3              - 만두민ManDoomin",
        "gazebo                 - SweetMarble",
        "ghost_pumpkin          - Goldrobin",
        "ghosts                 - Goldrobin",
        "giant_pumpkin          - TunaSandwichGaming",
        "gravestone             - Goldrobin",
        "grim_reaper            - TunaSandwichGaming",
        "halloween_house1       - Eli's Art",
        "halloween_house2       - Little Ray | Minecraft",
        "halloween_house3       - HALNY",
        "hot_air_ballon_house   - Lomby",
        "iron_farm              - Eligos",
        "japanese_house1        - Zaypixel",
        "japanese_house2        - Nanaroid",
        "kuromi_house           - 만두민ManDoomin",
        "large_pumpkin          - Goldrobin",
        "lava_farm              - Jaype",
        "lie_detector           - MINE GANG Z",
        "lobby1                 - DiddiHD",
        "magic_ritual           - Goldrobin",
        "medieval_house1        - Luvli Craft",
        "medieval_house2        - Oryntor",
        "medieval_house3        - NeatCraft",
        "medieval_house4        - Gorillo",
        "medieval_house5        - Lex The Builder",
        "medieval_house6        - Oryntor",
        "mine1                  - LionCheater",
        "modern_house1          - HALNY",
        "modern_house2          - Lomby",
        "modern_house3          - ModiBlocks",
        "modern_house4          - Derpy Jhomes",
        "modern_house5          - ModiBlocks",
        "modern_house6          - HALNY",
        "modern_house7          - Luvli Craft",
        "modern_mansion1        - Blockson",
        "nether_portal1         - Eli's Art",
        "nether_portal2         - Goldrobin",
        "nether_portal3         - Crafty Build It",
        "nether_portal4         - SidioMC",
        "nether_portal5         - Eli's Art",
        "nether_portal6         - FunBook",
        "nether_portal7         - ChowderFin",
        "parasaur               - nomu builds",
        "pond                   - Goldrobin",
        "presents_house         - Luvli Craft",
        "pumpkin_carriage       - TunaSandwichGaming",
        "pvp_arena              - ChowderFin",
        "raid_farm              - Freaky Bhagu",
        "reindeer               - One Team",
        "rocket                 - Noise Gaming",
        "santa_hat              - One Team",
        "santa_sleigh           - One Team",
        "school                 - HALNY + Lomby",
        "secret_base1(entrance) - Tomco",
        "shulker_farm           - BlazedMC",
        "skyscraper1            - TSMC - Minecraft",
        "skyscraper2            - MrBlockHead",
        "snow_globe_house       - Submerge",
        "sorting_farm           - Kianix",
        "starter_house1         - ",
        "starter_house2         - FunBook",
        "starter_house3         - Fleezo",
        "starter_house4         - Gorillo",
        "starter_house5         - Mechitect",
        "starter_house6         - ",
        "starter_house7         - Gorillo",
        "starter_house8         - ",
        "starter_house9         - MineLand",
        "statue_axolotl         - One Team and Jmox",
        "statue_cat1            - One Team and Jmox",
        "statue_chicken         - One Team and Jmox",
        "statue_pikachu         - 만두민ManDoomin",
        "statue_rabbit          - One Team and Jmox",
        "statue_turtle          - One Team and Jmox",
        "statue_woody           - 만두민ManDoomin",
        "storage_room           - Cryptozoology",
        "suburban_house1        - Rizzial",
        "sugarcane_farm         - Adil Gamez",
        "super_smelter          - Nanaroid",
        "swing                  - Snoebloc",
        "swing2                 - Mr Mirror",
        "tank                   - Noise Gaming",
        "tiny_city              - 만두민ManDoomin",
        "tower1                 - Minecraft Fantasy Builds",
        "trading_hall           - Go Out YT",
        "tree_house1            - Lex The Builder",
        "tree_house2            - Goldrobin",
        "tree_house3            - Mia Bloom",
        "tree_house4            - Lomby",
        "tree_house5            - Lomby",
        "tree_house6            - LockeyCraft",
        "tree_house7            - Polar Cat",
        "underground_house1     - Zaypixel",
        "underground_house2     - LockyCraft",
        "underground_house3     - Gorillo",
        "underground_house4     - Spudetti",
        "underground_house5     - Nanaroid",
        "underground_house6     - Zaypixel",
        "underground_house7     - Luvli Craft",
        "underwater_house1      - Lex The Builder",
        "underwater_house2      - Luvli Craft",
        "viking_ship            - NeatCraft",
        "volcano                - submerge",
        "wagon                  - Sekai",
        "wart_farm              - By Me",
        "well                   - Spudetti",
        "winter_house1          - Luvli Craft",
        "winter_house2          - One Team",
        "winter_house3          - One Team",
        "world_safest_house     - 만두민ManDoomin",
        "xp_farm                - 만두민ManDoomin (DesignBy Me)",
        "yacht                  - Lomby\n",
        "§d--- Instagram ---",
        "§7cute_enderdragaon    - jamesbuildsmc",
        "cute_penguin           - soyeiikoo",
        "spining_lamp           - trevoxmc"
    ].join('\n');

    const form = new ActionFormData()
        .title("§l§2Build Sources & Credits")
        .body(creditsText)
        .button("§c§l⬅ Back to Menu");

    form.show(player).then((res) => {
        if (res.canceled) return;
        if (res.selection === 0) {
            showCategoryMenu(player);
        }
    });
}

export function showStructureMenu(player, category) {
  const isSurvivalMode = player.getDynamicProperty('dg_surv_mode') === true;

  const form = new ActionFormData()
    .title(`§l§6${category.name}`)
    .body("§7Select a structure:");
    
  for (const s of category.structures) {
    const isUnlocked = player.getDynamicProperty(`dg_unlk_${s.id}`) === true;
    const lockPrefix = (isSurvivalMode && !isUnlocked) ? "§c[LOCKED] " : "";
    form.button(`${lockPrefix}§l§a${s.name}`, s.icon);
  }

  
  form.button("§c§l⬅ Back to Menu");

  form.show(player).then((res) => {
    if (res.canceled) return;

    
    if (res.selection === category.structures.length) {
        showCategoryMenu(player);
        return;
    }

    const selected = category.structures[res.selection];
    if (!selected) return;

    const isUnlocked = player.getDynamicProperty(`dg_unlk_${selected.id}`) === true;

    if (isSurvivalMode && !isUnlocked) {
        showResourceUI(player, selected);
    } else {
        system.runTimeout(() => {
            spawnWithUndo(player, selected, structureSizes).catch(() => {});
        }, 10);
    }

  }).catch(() => {
    player.sendMessage?.("§cError showing structures.");
  });
}