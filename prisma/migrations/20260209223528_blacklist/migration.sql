-- CreateTable
CREATE TABLE "BlacklistedToken" (
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedToken_token_key" ON "BlacklistedToken"("token");
