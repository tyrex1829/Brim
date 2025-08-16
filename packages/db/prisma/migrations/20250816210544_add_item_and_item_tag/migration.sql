/*
  Warnings:

  - You are about to drop the `item_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."item_tags" DROP CONSTRAINT "item_tags_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."item_tags" DROP CONSTRAINT "item_tags_tagId_fkey";

-- DropTable
DROP TABLE "public"."item_tags";

-- CreateTable
CREATE TABLE "public"."_ItemToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToTag_B_index" ON "public"."_ItemToTag"("B");

-- AddForeignKey
ALTER TABLE "public"."_ItemToTag" ADD CONSTRAINT "_ItemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ItemToTag" ADD CONSTRAINT "_ItemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
