


export const structures = [
  {
        name: "Cannon",
        id: "cannon",
        icon: "textures/ui/cannon",
        commands: {
          West: `/structure load cannon ~-9 ~0 ~-4 270_degrees`,
          South: `/structure load cannon ~-4 ~0 ~5 180_degrees`,
          East: `/structure load cannon ~5 ~0 ~-4 90_degrees`,
          North: `/structure load cannon ~-4 ~0 ~-9`,
        },
        offsets: {
          West: { dx: -9, dy: 0, dz: -4 },
          South: { dx: -4, dy: 0, dz: 5 },
          East: { dx: 5, dy: 0, dz: -4 },
          North: { dx: -4, dy: 0, dz: -9 },
        },
      },
      {
        name: "Car",
        id: "car",
        icon: "textures/ui/car",
        commands: {
          West: `/structure load car ~-10 ~0 ~-7 180_degrees`,
          South: `/structure load car ~-7 ~0 ~4 90_degrees`,
          East: `/structure load car ~4 ~0 ~-8`,
          North: `/structure load car ~-8 ~0 ~-10 270_degrees`,
        },
        offsets: {
          West: { dx: -10, dy: 0, dz: -7 },
          South: { dx: -7, dy: 0, dz: 4 },
          East: { dx: 4, dy: 0, dz: -8 },
          North: { dx: -8, dy: 0, dz: -10 },
        },
      },
      {
        name: "Fountain 1",
        id: "fountain1",
        icon: "textures/ui/fountain1",
        commands: {
          West: `/structure load fountain1 ~-24 ~-1 ~-11 270_degrees`,
          South: `/structure load fountain1 ~-11 ~-1 ~5 180_degrees`,
          East: `/structure load fountain1 ~5 ~-1 ~-11 90_degrees`,
          North: `/structure load fountain1 ~-11 ~-1 ~-24`,
        },
        offsets: {
          West: { dx: -24, dy: -1, dz: -11 },
          South: { dx: -11, dy: -1, dz: 5 },
          East: { dx: 5, dy: -1, dz: -11 },
          North: { dx: -11, dy: -1, dz: -24 },
        },
      },
      {
        name: "Fountain 2",
        id: "fountain2",
        icon: "textures/ui/fountain2",
        commands: {
          West: `/structure load fountain2 ~-19 ~-2 ~-7 180_degrees`,
          South: `/structure load fountain2 ~-7 ~-2 ~5 90_degrees`,
          East: `/structure load fountain2 ~5 ~-2 ~-7`,
          North: `/structure load fountain2 ~-7 ~-2 ~-19 270_degrees`,
        },
        offsets: {
          West: { dx: -19, dy: -2, dz: -7 },
          South: { dx: -7, dy: -2, dz: 5 },
          East: { dx: 5, dy: -2, dz: -7 },
          North: { dx: -7, dy: -2, dz: -19 },
        },
      },
      {
        name: "Fountain 3",
        id: "fountain3",
        icon: "textures/ui/fountain3",
        commands: {
          West: `/structure load fountain3 ~-43 ~-7 ~-19 180_degrees`,
          South: `/structure load fountain3 ~-19 ~-7 ~5 90_degrees`,
          East: `/structure load fountain3 ~5 ~-7 ~-19`,
          North: `/structure load fountain3 ~-19 ~-7 ~-43 270_degrees`,
        },
        offsets: {
          West: { dx: -43, dy: -7, dz: -19 },
          South: { dx: -19, dy: -7, dz: 5 },
          East: { dx: 5, dy: -7, dz: -19 },
          North: { dx: -19, dy: -7, dz: -43 },
        },
      },
      {
        name: "Gazebo",
        id: "gazebo",
        icon: "textures/ui/gazebo",
        commands: {
          West: `/structure load gazebo ~-17 ~0 ~-6 90_degrees`,
          South: `/structure load gazebo ~-6 ~0 ~5`,
          East: `/structure load gazebo ~5 ~0 ~-6 270_degrees`,
          North: `/structure load gazebo ~-6 ~0 ~-17 180_degrees`,
        },
        offsets: {
          West: { dx: -17, dy: 0, dz: -6 },
          South: { dx: -6, dy: 0, dz: 5 },
          East: { dx: 5, dy: -1, dz: -6 },
          North: { dx: -6, dy: -1, dz: -17 },
        },
      },
      {
        name: "Pond",
        id: "pond",
        icon: "textures/ui/pond",
        commands: {
          West: `/structure load pond ~-18 ~-4 ~-7 90_degrees`,
          South: `/structure load pond ~-7 ~-4 ~5`,
          East: `/structure load pond ~5 ~-4 ~-6 270_degrees`,
          North: `/structure load pond ~-6 ~-4 ~-18 180_degrees`,
        },
        offsets: {
          West: { dx: -18, dy: -4, dz: -7 },
          South: { dx: -7, dy: -4, dz: 5 },
          East: { dx: 5, dy: -4, dz: -6 },
          North: { dx: -6, dy: -4, dz: -18 },
        },
      },
      {
        name: "Swing",
        id: "swing",
        icon: "textures/ui/swing",
        commands: {
          West: `/structure load swing ~-10 ~0 ~-6 180_degrees`,
          South: `/structure load swing ~-6 ~0 ~5 90_degrees`,
          East: `/structure load swing ~5 ~0 ~-6`,
          North: `/structure load swing ~-6 ~0 ~-10 270_degrees`,
        },
        offsets: {
          West: { dx: -10, dy: 0, dz: -6 },
          South: { dx: -6, dy: 0, dz: 5 },
          East: { dx: 5, dy: 0, dz: -6 },
          North: { dx: -6, dy: 0, dz: -10 },
        },
      },
      {
        name: "Wagon",
        id: "wagon",
        icon: "textures/ui/wagon",
        commands: {
          West: `/structure load wagon ~-12 ~0 ~-2 270_degrees`,
          South: `/structure load wagon ~-2 ~0 ~4 180_degrees`,
          East: `/structure load wagon ~5 ~0 ~-2 90_degrees`,
          North: `/structure load wagon ~-2 ~0 ~-12`,
        },
        offsets: {
          West: { dx: -12, dy: 0, dz: -2 },
          South: { dx: -2, dy: 0, dz: 4 },
          East: { dx: 5, dy: 0, dz: -2 },
          North: { dx: -2, dy: 0, dz: -12 },
        },
      },
      {
        name: "Well",
        id: "well",
        icon: "textures/ui/well",
        commands: {
          West: `/structure load well ~-16 ~-1 ~-4 90_degrees`,
          South: `/structure load well ~-4 ~-1 ~1`,
          East: `/structure load well ~1 ~-1 ~-4 270_degrees`,
          North: `/structure load well ~-4 ~-1 ~-16 180_degrees`,
        },
        offsets: {
          West: { dx: -16, dy: -1, dz: -4 },
          South: { dx: -4, dy: -1, dz: 1 },
          East: { dx: 1, dy: -1, dz: -4 },
          North: { dx: -4, dy: -1, dz: -16 },
        },
      },
      {
        name: "Well 2",
        id: "well2",
        icon: "textures/ui/well2",
        commands: {
          West: `/structure load well2 ~-17 ~-4 ~-8`,
          South: `/structure load well2 ~-8 ~-4 ~5 270_degrees`,
          East: `/structure load well2 ~5 ~-4 ~-8 180_degrees`,
          North: `/structure load well2 ~-8 ~-4 ~-17 90_degrees`,
        },
        offsets: {
          West: { dx: -17, dy: -4, dz: -8 },
          South: { dx: -8, dy: -4, dz: 5 },
          East: { dx: 5, dy: -4, dz: -8 },
          North: { dx: -8, dy: -4, dz: -17 },
        },
      },
];