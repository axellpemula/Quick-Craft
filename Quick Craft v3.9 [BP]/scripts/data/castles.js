
export const structures = [
  {
        name: "Castle",
        id: "castle1",
        icon: "textures/ui/castle",
        commands: {
          West: [
                  `/structure load castle_l0 ~-53 ~-3 ~-25`,
                  `/structure load castle_l1 ~-53 ~5 ~-25`,
                  `/structure load castle_l2 ~-53 ~15 ~-25`
                ],
          South: [
                  `/structure load castle_l0 ~-25 ~-3 ~5 270_degrees`,
                  `/structure load castle_l1 ~-25 ~5 ~5 270_degrees`,
                  `/structure load castle_l2 ~-25 ~15 ~5 270_degrees`,
                ],
          East: [
                `/structure load castle_l0 ~5 ~-3 ~-25 180_degrees`,
                `/structure load castle_l1 ~5 ~5 ~-25 180_degrees`,
                `/structure load castle_l2 ~5 ~15 ~-25 180_degrees`
                ],
          North: [
                  `/structure load castle_l0 ~-25 ~-3 ~-53 90_degrees`,
                  `/structure load castle_l1 ~-25 ~5 ~-53 90_degrees`,
                  `/structure load castle_l2 ~-25 ~15 ~-53 90_degrees`,
                 ],
        },
        offsets: {
          West: { dx: -53, dy: -3, dz: -25 },
          South: { dx: -25, dy: -3, dz: 5 },
          East: { dx: 5, dy: -3, dz: -25 },
          North: { dx: -25, dy: -3, dz: -53 },
        },
      },
      {
        name: "Castle 2",
        id: "castle2",
        icon: "textures/ui/castle2",
        commands: {
          West: `/structure load castle2 ~-17 ~-1 ~-5 180_degrees`,
          South: `/structure load castle2 ~-5 ~-1 ~5 90_degrees`,
          East: `/structure load castle2 ~5 ~-1 ~-4`,
          North: `/structure load castle2 ~-4 ~-1 ~-17 270_degrees`,
        },
        offsets: {
          West: { dx: -17, dy: -1, dz: -5 },
          South: { dx: -5, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -4 },
          North: { dx: -4, dy: -1, dz: -17 },
        },
      },
      {
        name: "Castle 3",
        id: "castle3",
        icon: "textures/ui/castle3",
        commands: {
          West: `/structure load castle3 ~-29 ~-2 ~-11 180_degrees`,
          South: `/structure load castle3 ~-11 ~-2 ~5 90_degrees`,
          East: `/structure load castle3 ~5 ~-2 ~-11`,
          North: `/structure load castle3 ~-11 ~-2 ~-29 270_degrees`,
        },
        offsets: {
          West: { dx: -29, dy: -2, dz: -11 },
          South: { dx: -11, dy: -2, dz: 5 },
          East: { dx: 5, dy: -2, dz: -11 },
          North: { dx: -11, dy: -2, dz: -29 },
        },
      },
      {
        name: "Castle 4",
        id: "castle4",
        icon: "textures/ui/castle4",
        commands: {
          West: `/structure load castle4 ~-23 ~-1 ~-8 180_degrees`,
          South: `/structure load castle4 ~-8 ~-1 ~5 90_degrees`,
          East: `/structure load castle4 ~5 ~-1 ~-8`,
          North: `/structure load castle4 ~-8 ~-1 ~-23 270_degrees`,
        },
        offsets: {
          West: { dx: -23, dy: -1, dz: -8 },
          South: { dx: -8, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -8 },
          North: { dx: -8, dy: -1, dz: -23 },
        },
      },
      {
        name: "Castle 5",
        id: "castle5",
        icon: "textures/ui/castle5",
        commands: {
          West: `/structure load castle5 ~-21 ~-3 ~-11 180_degrees`,
          South: `/structure load castle5 ~-11 ~-3 ~5 90_degrees`,
          East: `/structure load castle5 ~5 ~-3 ~-11`,
          North: `/structure load castle5 ~-11 ~-3 ~-21 270_degrees`,
        },
        offsets: {
          West: { dx: -21, dy: -3, dz: -11 },
          South: { dx: -11, dy: -3, dz: 5 },
          East: { dx: 5, dy: -3, dz: -11 },
          North: { dx: -11, dy: -3, dz: -21 },
        },
      },
      {
        name: "Castle 6",
        id: "castle6",
        icon: "textures/ui/castle6",
        commands: {
          West: `/structure load castle6 ~-23 ~-1 ~-9 90_degrees`,
          South: `/structure load castle6 ~-9 ~-1 ~5`,
          East: `/structure load castle6 ~5 ~-1 ~-9 270_degrees`,
          North: `/structure load castle6 ~-9 ~-1 ~-23 180_degrees`,
        },
        offsets: {
          West: { dx: -23, dy: -1, dz: -9 },
          South: { dx: -9, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -9 },
          North: { dx: -9, dy: -1, dz: -23 },
        },
      },
];