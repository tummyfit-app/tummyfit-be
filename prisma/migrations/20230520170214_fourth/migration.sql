-- CreateTable
CREATE TABLE "UserDescription" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "gluten_free" TEXT NOT NULL,
    "dairy_free" TEXT NOT NULL,
    "vegan" TEXT NOT NULL,
    "vegetarian" TEXT NOT NULL,
    "alcohol" TEXT NOT NULL,
    "daily_activity" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserDescription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDescription_userId_key" ON "UserDescription"("userId");

-- AddForeignKey
ALTER TABLE "UserDescription" ADD CONSTRAINT "UserDescription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
