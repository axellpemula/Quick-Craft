

export const structures = [
  {
        name: "Tree House 1",
        id: "tree_house1",
        icon: "textures/ui/tree_house1",
        commands: {
          West: `/structure load tree_house1 ~-28 ~-1 ~-15 270_degrees`,
          South: `/structure load tree_house1 ~-15 ~-1 ~5 180_degrees`,
          East: `/structure load tree_house1 ~5 ~-1 ~-10 90_degrees`,
          North: `/structure load tree_house1 ~-11 ~-1 ~-28`,
        },
        offsets: {
          West: { dx: -28, dy: -1, dz: -15 },
          South: { dx: -15, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -10 },
          North: { dx: -11, dy: -1, dz: -28 },
        },
      },
      {
        name: "Tree House 2",
        id: "tree_house2",
        icon: "textures/ui/tree_house2",
        commands: {
          West: `/structure load tree_house2 ~-19 ~-1 ~-7 270_degrees`,
          South: `/structure load tree_house2 ~-7 ~-1 ~5 180_degrees`,
          East: `/structure load tree_house2 ~5 ~-1 ~-13 90_degrees`,
          North: `/structure load tree_house2 ~-7 ~-1 ~-19`,
        },
        offsets: {
          West: { dx: -19, dy: -1, dz: -7 },
          South: { dx: -7, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -7 },
          North: { dx: -7, dy: -1, dz: -19 },
        },
      },
      {
        name: "Tree House 3",
        id: "tree_house3",
        icon: "textures/ui/tree_house3",
        commands: {
          West: [
                  `/structure load tree_house3_l0 ~-19 ~-1 ~-17`,
                  `/structure load tree_house3_l1 ~-19 ~15 ~-17`,
                ],
          South: [
                  `/structure load tree_house3_l0 ~-17 ~-1 ~5 270_degrees`,
                  `/structure load tree_house3_l1 ~-17 ~15 ~5 270_degrees`,
                ],
          East: [
                  `/structure load tree_house3_l0 ~5 ~-1 ~-16 180_degrees`,
                  `/structure load tree_house3_l1 ~5 ~15 ~-16 180_degrees`,
                ],
          North: [
                  `/structure load tree_house3_l0 ~-16 ~-1 ~-19 90_degrees`,
                  `/structure load tree_house3_l1 ~-16 ~15 ~-19 90_degrees`,
                ],
        },
        offsets: {
          West: { dx: -19, dy: -1, dz: -17 },
          South: { dx: -17, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -16 },
          North: { dx: -16, dy: -1, dz: -19 },
        },
      },
      {
        name: "Tree House 4",
        id: "tree_house4",
        icon: "textures/ui/tree_house4",
        commands: {
          West: `/structure load tree_house4 ~-17 ~-1 ~-9 270_degrees`,
          South: `/structure load tree_house4 ~-9 ~-1 ~5 180_degrees`,
          East: `/structure load tree_house4 ~5 ~-1 ~-8 90_degrees`,
          North: `/structure load tree_house4 ~-8 ~-1 ~-17`,
        },
        offsets: {
          West: { dx: -17, dy: -1, dz: -9 },
          South: { dx: -9, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -8 },
          North: { dx: -8, dy: -1, dz: -17 },
        },
      },
      {
        name: "Tree House 5",
        id: "tree_house5",
        icon: "textures/ui/tree_house5",
        commands: {
          West: [
                  `/structure load tree_house5_l0 ~-35 ~-1 ~-18`,
                  `/structure load tree_house5_l1 ~-35 ~19 ~-18`,
                ],
          South: [
                  `/structure load tree_house5_l0 ~-18 ~-1 ~2 270_degrees`,
                  `/structure load tree_house5_l1 ~-18 ~19 ~2 270_degrees`,
                ],
          East: [
                  `/structure load tree_house5_l0 ~2 ~-1 ~-18 180_degrees`,
                  `/structure load tree_house5_l1 ~2 ~19 ~-18 180_degrees`,
                ],
          North: [
                  `/structure load tree_house5_l0 ~-18 ~-1 ~-35 90_degrees`,
                  `/structure load tree_house5_l1 ~-18 ~19 ~-35 90_degrees`,
                ],
        },
        offsets: {
          West: { dx: -35, dy: -1, dz: -18 },
          South: { dx: -18, dy: -1, dz: 2 },
          East: { dx: 2, dy: -1, dz: -18 },
          North: { dx: -18, dy: -1, dz: -35 },
        },
      },
      {
        name: "Tree House 6",
        id: "tree_house6",
        icon: "textures/ui/tree_house6",
        commands: {
          West: `/structure load tree_house6 ~-26 ~-1 ~-14 180_degrees`,
          South: `/structure load tree_house6 ~-14 ~-1 ~5 90_degrees`,
          East: `/structure load tree_house6 ~5 ~-1 ~-9`,
          North: `/structure load tree_house6 ~-9 ~-1 ~-26 270_degrees`,
        },
        offsets: {
          West: { dx: -26, dy: -1, dz: -14 },
          South: { dx: -14, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -9 },
          North: { dx: -9, dy: -1, dz: -26 },
        },
      },
      {
        name: "Tree House 7",
        id: "tree_house7",
        icon: "textures/ui/tree_house7",
        commands: {
          West: `/structure load tree_house7 ~-15 ~-1 ~-6 180_degrees`,
          South: `/structure load tree_house7 ~-6 ~-1 ~5 90_degrees`,
          East: `/structure load tree_house7 ~5 ~-1 ~-7`,
          North: `/structure load tree_house7 ~-7 ~-1 ~-15 270_degrees`,
        },
        offsets: {
          West: { dx: -15, dy: -1, dz: -6 },
          South: { dx: -6, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -7 },
          North: { dx: -7, dy: -1, dz: -15 },
        },
      },
];