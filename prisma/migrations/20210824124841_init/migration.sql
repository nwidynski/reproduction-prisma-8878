-- CreateTable
CREATE TABLE "TestItem" (
    "id" TEXT NOT NULL,
    "col1" TEXT NOT NULL,
    "col2" INTEGER NOT NULL,
    "col3" TEXT NOT NULL,
    "col4" TEXT NOT NULL,
    "col5" TEXT NOT NULL,
    "col6" TEXT NOT NULL,
    "col7" TEXT NOT NULL,
    "col8" TEXT NOT NULL DEFAULT E'unknown',
    "col9" TEXT NOT NULL DEFAULT E'unknown',
    "col10" TEXT NOT NULL,
    "col11" TEXT NOT NULL,
    "col12" TEXT NOT NULL,
    "col13" TEXT NOT NULL DEFAULT E'unknown',
    "col14" TEXT NOT NULL DEFAULT E'unknown',
    "col15" TEXT NOT NULL,
    "col16" TEXT NOT NULL,
    "col17" TEXT NOT NULL,
    "col18" TEXT NOT NULL,
    "col19" TEXT NOT NULL,
    "col20" TEXT NOT NULL,
    "col21" TEXT NOT NULL,
    "col22" BOOLEAN NOT NULL DEFAULT true,
    "col23" BOOLEAN NOT NULL DEFAULT true,
    "col24" BOOLEAN NOT NULL DEFAULT false,
    "col25" BOOLEAN NOT NULL DEFAULT false,
    "col26" BOOLEAN NOT NULL DEFAULT false,
    "raw" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestPattern" (
    "id" TEXT NOT NULL,
    "fk1" TEXT NOT NULL,
    "col1" TEXT NOT NULL,
    "col4" TEXT NOT NULL,
    "col5" TEXT NOT NULL,
    "col6" TEXT NOT NULL,
    "col7" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestMarket" (
    "id" TEXT NOT NULL,
    "fk1" TEXT NOT NULL,
    "fk2" TEXT,
    "col1" TEXT NOT NULL,
    "col5" TEXT NOT NULL,
    "col6" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestItem.col1_col2_unique" ON "TestItem"("col1", "col2");

-- CreateIndex
CREATE UNIQUE INDEX "TestPattern.fk1_col1_unique" ON "TestPattern"("fk1", "col1");

-- CreateIndex
CREATE UNIQUE INDEX "TestMarket.fk1_fk2_col1_unique" ON "TestMarket"("fk1", "fk2", "col1");

-- AddForeignKey
ALTER TABLE "TestPattern" ADD FOREIGN KEY ("fk1") REFERENCES "TestItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestMarket" ADD FOREIGN KEY ("fk1") REFERENCES "TestItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestMarket" ADD FOREIGN KEY ("fk2") REFERENCES "TestPattern"("id") ON DELETE SET NULL ON UPDATE CASCADE;
