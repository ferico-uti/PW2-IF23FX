"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/scripts";
import { api_barang } from "@/lib/strings";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";
import styles from "../barang.module.css";
import { useRouter } from "next/navigation";

// buat interface untuk data barang
interface ModelBarang {
  id: number;
  kode: string;
  nama: string;
  harga: number;
  satuan: string;
}

// buat variabel fetcher

// buat interface untuk
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ViewBarangPage() {
  // const nama = "TEKNOKRAT";
  // const motto = "Sang Juar

  // buat interface untuka";

  // return <div>Halaman View Barang {`${nama} ${motto}`} </div>;

  // buat variabel router (untuk navigasi form)
  const router = useRouter();

  // definisi SWR
  const { data, error, isLoading, mutate } = useSWR(api_barang, fetcher);
  

  // buat fungsi untuk hapus data
  const deleteData = async (id: number) => {
    try {
      const response = await axios.delete(`${api_barang}/${id}`);

      // jika success == true
      if (response.data.success) {
        toast.success(response.data.message);
      }
      // jika success == false
      else {
        toast.error(response.data.message);
      }
    } finally {
      // refresh data
      mutate(data);
    }
  };

  // jika terjadi error (pengambilan data API)
  // if(error) {
  //   return <div>Gagal Mengambil Data !</div>
  // }

  // proses tunggu pengambilan data API
  // if(isLoading)
  // {
  //   return <div>Mohon Tunggu...</div>
  // }

  return (
    <section className={styles.page}>
      <title>Tampil Data Barang</title>
      {/* tombol / navigasi */}
      <nav className="mb-4 flex sm:justify-end md:justify-start justify-center">
        <Link
          href="/barang/add"
          className="sm:bg-cyan-700 bg-rose-700 px-8 py-2 text-white rounded-full">
          Tambah Data
        </Link>
      </nav>

      {/* tabel barang */}
      <article>
        {/* <table>
          <tr>
            <th>Aksi</th>
            <th>Kode</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Satuan</th>
          </tr> */}
        {error ? (
          <div className="text-rose-700">Gagal Mengambil Data !</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%] text-center">Aksi</TableHead>
                <TableHead className="w-[10%] text-center">Kode</TableHead>
                <TableHead className="w-auto text-center">Nama</TableHead>
                <TableHead className="w-[10%] text-center">
                  Harga (Rp)
                </TableHead>
                <TableHead className="w-[10%] text-center">Satuan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Mohon Tunggu ...
                  </TableCell>
                </TableRow>
              ) : (
                data &&
                data.barang.map((item: ModelBarang) => (
                  // <div key={item.id}>
                  //   <p>{item.nama}</p>
                  // </div>
                  // <tr key={item.id}>
                  //   <td>-</td>
                  //   <td>{item.kode}</td>
                  //   <td>{item.nama}</td>
                  //   <td>{item.harga}</td>
                  //   <td>{item.satuan}</td>
                  // </tr>

                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      {/* tombol ubah */}
                      <button className={styles.btn_edit} onClick={() => router.push(`/barang/edit/${item.id}`)}>
                        <Pencil size={16} color="black" />
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger className={styles.btn_delete}>
                          {/* tombol hapus */}
                          <Trash2 size={16} color="white" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Konfirmasi Hapus Data Barang
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Data Barang : {`(${item.kode}) ${item.nama}`}{" "}
                              Ingin Dihapus ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteData(item.id)}>
                              Ya
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="text-center">{item.kode}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell className="text-right">
                      {formatRupiah(item.harga)}
                    </TableCell>
                    <TableCell className="text-center">{item.satuan}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {/* </table> */}
      </article>
    </section>
  );
}
