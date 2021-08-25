import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});

async function main() {
  const names: string[] = [];

  prisma.$on("query", (e) => console.log(e));

  for (let i = 0; i < 10000; i++) {
    names.push("random" + i);
  }
  const itemsWithMarket = await prisma.testItem.findMany({
    where: {},
    include: { Markets: true },
  });

  console.log(itemsWithMarket.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
