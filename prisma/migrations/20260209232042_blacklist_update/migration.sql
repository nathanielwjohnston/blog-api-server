/*
  Warnings:

  - You are about to drop the column `token` on the `BlacklistedToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenId]` on the table `BlacklistedToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenId` to the `BlacklistedToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BlacklistedToken_token_key";

-- AlterTable
ALTER TABLE "BlacklistedToken" DROP COLUMN "token",
ADD COLUMN     "tokenId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedToken_tokenId_key" ON "BlacklistedToken"("tokenId");
