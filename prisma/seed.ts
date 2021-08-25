/**
 * Seed all the tables
 */

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

function random(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

async function seed() {
  let items: Prisma.TestItemCreateManyInput[] = [];
  let patterns: Prisma.TestPatternCreateManyInput[] = [];
  let markets: Prisma.TestMarketCreateManyInput[] = [];

  for (let i = 0; i < 25000; i++) {
    const item: Prisma.TestItemCreateManyInput = {
      id: "random" + i + "_" + 7567,
      col1: "random" + i,
      col2: 7567,
      col3: random(20),
      col4: random(25),
      col5: random(150),
      col6: random(5),
      col7: random(17),
      col8: random(200),
      col9: random(20),
      col10: random(25),
      col11: random(150),
      col12: random(5),
      col13: random(17),
      col14: random(200),
      col15: random(20),
      col16: random(25),
      col17: random(150),
      col18: random(5),
      col19: random(17),
      col20: random(200),
      col21: random(20),
      col22: true,
      col23: false,
      col24: true,
      col25: false,
      col26: false,
      raw: { value: random(50) },
    };

    items.push(item);
  }

  let itemName = "random" + randomInt(24999) + "_" + 7567;

  for (let i = 0; i < 500; i++) {
    if (i % 5 === 0) {
      itemName = "random" + randomInt(24999) + "_" + 7567;
    }

    let patternIndex = 0;

    if (i % 5 === 1) {
      patternIndex = 1;
    } else if (i % 5 === 2) {
      patternIndex = 2;
    } else if (i % 5 === 3) {
      patternIndex = 3;
    } else if (i % 5 === 4) {
      patternIndex = 4;
    }

    const pattern: Prisma.TestPatternCreateManyInput = {
      id: itemName + "_" + "random" + patternIndex,
      fk1: itemName,
      col1: "random" + patternIndex,
      col4: random(25),
      col5: random(150),
      col6: random(5),
      col7: randomInt(20),
    };

    patterns.push(pattern);
  }

  itemName = "random" + randomInt(24999);

  const marketNames: string[] = [];

  for (let i = 0; i < 10; i++) {
    marketNames.push(random(10));
  }

  let marketName = marketNames[randomInt(9)];

  for (let i = 0; i < 150000; i++) {
    let marketIndex = i % 10;

    marketName = marketNames[marketIndex];

    if (i % 10 === 0) {
      let exists = true;

      while (exists) {
        itemName = "random" + randomInt(24999);

        if (
          !markets.find(
            (market) => market.col1 === marketName && market.fk1 === itemName
          )
        ) {
          exists = false;
        }
      }
    }

    const id = marketName + "_" + itemName + "_" + 7567;

    const market: Prisma.TestMarketCreateManyInput = {
      id: id,
      col1: marketName,
      fk1: itemName + "_" + 7567,
      fk2: null,
      col5: random(150),
      col6: random(5),
    };

    markets.push(market);

    let patternItem = patterns.find((pattern) => pattern.col1 === itemName);

    if (patternItem) {
      for (let k = 0; k < 5; k++) {
        const market: Prisma.TestMarketCreateManyInput = {
          id: id + "_" + "random" + k,
          col1: marketName,
          fk1: itemName + "_" + 7567,
          fk2: "random" + k,
          col5: random(150),
          col6: random(5),
        };

        markets.push(market);
      }
    }
  }

  const uniquePatterns = patterns.reduce(
    (map, pattern) => map.set(pattern.id, pattern),
    new Map<string, Prisma.TestPatternCreateManyInput>()
  );

  const uniqueMarkets = markets.reduce(
    (map, market) => map.set(market.id, market),
    new Map<string, Prisma.TestMarketCreateManyInput>()
  );

  console.log("Creating items...");

  await prisma.testItem.createMany({ data: items });

  console.log("Creating patterns...");

  await prisma.testPattern.createMany({ data: [...uniquePatterns.values()] });

  console.log("Creating markets...");

  await prisma.testMarket.createMany({ data: [...uniqueMarkets.values()] });

  console.log("Seeded successfully...");

  await prisma.$disconnect();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
