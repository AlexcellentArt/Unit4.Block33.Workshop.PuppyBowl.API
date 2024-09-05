const prisma = require("../prisma");
const seed = async () => {
  const createPlayers = async () => {
    const players = [
      { name: "posey",breed:"chihuahua",status:"field" },
      { name: "brad",breed:"basset hound",status:"bench" },
      { name: "lassie",breed:"collie",status:"field" },
      { name: "lola",breed:"bulldog",status:"bench" },
      { name: "casey",breed:"schnoodle",status:"bench" },
      { name: "roo",breed:"terrier",status:"bench" },
      { name: "ollie",breed:"greyhound",status:"field" },
      { name: "rover",breed:"german shepard",status:"field" },
      { name: "sparky",breed:"golden retriever",status:"field" },
      { name: "igor",breed:"experiment",status:"bench" },
      { name: "scooby",breed:"great dane",status:"kitchen" },
      { name: "krypto",breed:"super",status:"sky" }
    ];
    await prisma.player.createMany({ data: players });
  };
  await createPlayers();
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
