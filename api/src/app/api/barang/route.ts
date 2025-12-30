import { PrismaClient } from "@/generated/prisma"
import { NextRequest, NextResponse } from "next/server"

// buat variabel prisma (PrismaClient)
const prisma = new PrismaClient()

// buat service GET
export const GET = async () => {
    // return new NextResponse(JSON.stringify(
    //     {
    //         message: "Test",
    //         success: true
    //     }http://localhost:3001/api/barang/
    // ));

    // buat variabel untuk menampilkan data barang
    const barang = await prisma.tb_barang.findMany({
        orderBy: {
            kode: "asc"
        }
    })
    // tampilkan hasil data barang
    return NextResponse.json({
        barang: barang
    })
}


// buat service POST (simpan data)
export const POST = async (request: NextRequest) => {
    const data = await request.json()

    // cek apakah kode barang sudah ada / belum
    const check = await prisma.tb_barang.findFirst({
        where: {
            kode: data.kode
        },
        select: {
            kode: true,            
        }
    })
    // jika data ditemukan
    if (check) {
        return NextResponse.json({
            message: "Data Barang Gagal Disimpan (Kode Sudah Dipakai !)",
            success: false
        })
    }
    // jika data tidak ditemukan

    // simpan data
    await prisma.tb_barang.create({
        data: {
            kode: data.kode,
            harga: data.harga,
            nama: data.nama,
            satuan: data.satuan,
        }
    })

    return NextResponse.json({
        message: "Data Barang Berhasil Disimpan",
        success: true
    })


}
