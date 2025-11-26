import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat variabel prisma
const prisma = new PrismaClient();

// buat service DELETE (hapus data)
export const DELETE = async (request: NextRequest,
    { params }: { params: { slug: string } }) => {
    const id = params.slug

    // cek apakah id sudah ada / belum
    const check = await prisma.tb_barang.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true
        }
    })

    // jika data tidak ditemukan
    if (!check) {
        return NextResponse.json({
            message: "Data Barang Gagal Dihapus (Kode Tidak Ditemukan !)",
            success: false
        })
    }

    // jika data ditemukan
    await prisma.tb_barang.delete({
        where: {
            id: Number(id)
        },
    })

    return NextResponse.json({
        message: "Data Barang Berhasil Dihapus",
        success: true
    })

}

// buat service PUT (ubah data)
export const PUT = async (request: NextRequest,
    { params }: { params: { slug: string } }) => {
    const id = params.slug
    const data = await request.json()    

    // cek apakah id sudah ada / belum
    const check = await prisma.tb_barang.findFirst({
        where: {
            id: {
                not: Number(id)
            },
            kode: data.kode
        },
        select: {
            id: true
        }
    })

    // jika data ditemukan
    if (check) {
        return NextResponse.json({
            message: "Data Barang Gagal Diubah (Kode Tidak Ditemukan !)",
            success: false
        })
    }

    // jika data tidak ditemukan

    await prisma.tb_barang.update({
        where: {
            id: Number(id)
        },
        data: {
            kode: data.kode,
            harga: data.harga,
            nama: data.nama,
            satuan: data.satuan,
        }
    })

    return NextResponse.json({
        message: "Data Barang Berhasil Diubah",
        success: true
    })

}