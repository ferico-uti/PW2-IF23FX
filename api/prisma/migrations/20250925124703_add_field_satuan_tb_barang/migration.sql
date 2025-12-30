/*
  Warnings:

  - Added the required column `satuan` to the `tb_barang` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."nama_satuan" AS ENUM ('UNIT', 'PCS', 'KILOGRAM');

-- AlterTable
ALTER TABLE "public"."tb_barang" ADD COLUMN     "satuan" "public"."nama_satuan" NOT NULL;
