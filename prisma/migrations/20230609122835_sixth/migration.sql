-- CreateTable
CREATE TABLE "UserMealPlan" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "food_name" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "UserMealPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMealPlan" ADD CONSTRAINT "UserMealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
