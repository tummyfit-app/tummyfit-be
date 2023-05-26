-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "namauser" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDescription" (
    "id" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "gluten_free" TEXT NOT NULL,
    "dairy_free" TEXT NOT NULL,
    "vegan" TEXT NOT NULL,
    "vegetarian" TEXT NOT NULL,
    "alcohol" TEXT NOT NULL,
    "daily_activity" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories" DECIMAL(65,30) NOT NULL,
    "fat" DECIMAL(65,30) NOT NULL,
    "protein" DECIMAL(65,30) NOT NULL,
    "image" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT NOT NULL,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDescription_userId_key" ON "UserDescription"("userId");

-- AddForeignKey
ALTER TABLE "UserDescription" ADD CONSTRAINT "UserDescription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
