-- CreateTable
CREATE TABLE "MealEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "meal" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatetAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MealEntry_date_key" ON "MealEntry"("date");
