-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_day_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    CONSTRAINT "day_habits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "day_habits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_day_habits" ("day_id", "habit_id", "id") SELECT "day_id", "habit_id", "id" FROM "day_habits";
DROP TABLE "day_habits";
ALTER TABLE "new_day_habits" RENAME TO "day_habits";
CREATE UNIQUE INDEX "day_habits_day_id_habit_id_key" ON "day_habits"("day_id", "habit_id");
CREATE TABLE "new_week_days_habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "week_days_habit_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_week_days_habit" ("habit_id", "id", "week_day") SELECT "habit_id", "id", "week_day" FROM "week_days_habit";
DROP TABLE "week_days_habit";
ALTER TABLE "new_week_days_habit" RENAME TO "week_days_habit";
CREATE UNIQUE INDEX "week_days_habit_habit_id_week_day_key" ON "week_days_habit"("habit_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
