"use client";

import ButtonPrimary from "@/components/custom/ButtonPrimary";
import ButtonSecondary from "@/components/custom/ButtonSecondary";
import InputText from "@/components/custom/InputText";
import LabelInput from "@/components/custom/LabelInput";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  filterHarga,
  filterHargaRaw,
  filterKode,
  filterNama,
  formatRibuan,
  formatRupiah,
} from "@/lib/scripts";
import { api_barang, btn_batal, btn_ubah } from "@/lib/strings";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import styles from "../../barang.module.css";

// buat data satuan barang
const satuan = [
  {
    value: "UNIT",
    label: "Unit",
  },
  {
    value: "PCS",
    label: "Pcs",
  },
  {
    value: "KILOGRAM",
    label: "Kilogram",
  },
];

export default function EditBarangPage() {
  // buat variabel router (untuk navigasi form)
  const router = useRouter();

  // buat variabel params untuk ambil nilai slug
  const params = useParams();
  const slug = Number(params.slug);

  // buat state untuk combobox satuan
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // buat state (object) untuk form
  const [form, setForm] = useState<{
    kode: string;
    nama: string;
    harga: string;
    harga_raw: number;
    satuan: string;
  }>({
    kode: "",
    nama: "",
    harga: "",
    harga_raw: 0,
    satuan: "",
  });

  // buat state untuk error komponen
  const [error, setError] = useState<{
    kode: boolean;
    nama: boolean;
    harga: boolean;
    satuan: boolean;
  }>({
    kode: false,
    nama: false,
    harga: false,
    satuan: false,
  });


  // buat fungsi untuk menampilkan detail data
  const fetchData = useCallback(async () => {
    // panggil API detail barang
    try {
      const response = await axios.get(`${api_barang}/${slug}`, {
        validateStatus: () => true,
      });

      // jika respon berhasil menampilkan data barang
      if (response.data.barang) {
        setForm({
          kode: response.data.barang.kode ?? "",
          nama: response.data.barang.nama ?? "",
          harga: formatRupiah(Number(response.data.barang.harga)) ?? "",
          harga_raw: response.data.barang.harga ?? 0,
          satuan: response.data.barang.satuan ?? "",
        });
        // isi combobox satuan
        setValue(response.data.barang.satuan ?? "");
      }
      // jika respon gagal menampilkan data barang
      else {
        // alihkan ke halaman 404
        router.replace("/404");
      }
    } catch (err) {
      console.log("Gagal Menampilkan Data !", err);
    }
  }, [slug, router]);


  // panggil fungsi fetchData
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // buat fungsi untuk ubah data
  const editData = async () => {
    const errorStatus = {
      kode: form.kode === "",
      nama: form.nama === "",
      harga: form.harga === "",
      satuan: value === "",
    };

    // update kondisi error setiap komponen
    setError(errorStatus);

    // jika terjadi error (ada komponen yang tidak diisi)
    const hasError = Object.values(errorStatus).includes(true);

    // hentikan proses ubah data
    if (hasError) {
      return;
    }

    // jika tidak error (seluruh komponen sudah diisi)
    //  ubah data
    try {
      const response = await axios.put(`${api_barang}/${slug}`, {
        kode: form.kode,
        nama: form.nama,
        harga: form.harga_raw,
        satuan: value,
      });

      // jika success == true
      if (response.data.success) {
        toast.success(response.data.message);
      }
      // jika success == false
      else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error(`Gagal Kirim Data !`);
    }
  };

  return (
    <section className={styles.page}>
      <title>Ubah Data Barang</title>

      {/* buat article */}
      <article className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {/* area kode */}
        <section>
          {/* panggil reusable component ButtonPrimary 
                        (components/custom/LabelInput.tsx)
                    */}
          <LabelInput htmlFor="txt_kode" required>Kode Barang</LabelInput>
          {/* panggil reusable component ButtonPrimary 
                        (components/custom/InputText.tsx)
                    */}
          <InputText
            type="text"
            id="txt_kode"
            placeholder="Isi Kode Barang"
            maxLength={10}
            value={form.kode}
            onChange={(value) => {
              const result = filterKode(value.target.value);
              setForm({ ...form, kode: result });
            }}
          />

          {error.kode && (
            <Label className={styles.error}>Kode Barang Harus Diisi !</Label>
          )}
        </section>

        {/* area nama */}
        <section>
          {/* panggil reusable component ButtonPrimary 
              (components/custom/LabelInput.tsx)
          */}
          <LabelInput htmlFor="txt_nama" required>Nama Barang</LabelInput>
          {/* panggil reusable component ButtonPrimary 
              (components/custom/InputText.tsx)
          */}
          <InputText
            type="text"
            id="txt_nama"
            placeholder="Isi Nama Barang"
            maxLength={50}
            value={form.nama}
            onChange={(value) => {
              const result = filterNama(value.target.value);
              setForm({ ...form, nama: result });
            }}
          />

          {error.nama && (
            <Label className={styles.error}>Nama Barang Harus Diisi !</Label>
          )}
        </section>

        {/* area harga */}
        <section>
          {/* panggil reusable component ButtonPrimary 
              (components/custom/LabelInput.tsx)
          */}
          <LabelInput htmlFor="txt_harga" required>Harga Barang</LabelInput>
          {/* panggil reusable component ButtonPrimary 
              (components/custom/InputText.tsx)
          */}
          <InputText
            type="text"
            id="txt_harga"
            placeholder="Isi Harga Barang"
            maxLength={11}
            value={form.harga}
            onChange={(value) => {
              const result = formatRibuan(filterHarga(value.target.value));
              const result_raw = filterHargaRaw(value.target.value);
              setForm({
                ...form,
                harga: result,
                harga_raw: Number(result_raw),
              });
            }}
          />

          {error.harga && (
            <Label className={styles.error}>Harga Barang Harus Diisi !</Label>
          )}
        </section>

        {/* area satuan */}
        <section>
          {/* panggil reusable component ButtonPrimary 
              (components/custom/LabelInput.tsx)
          */}
          <LabelInput htmlFor="cbo_satuan" required>Satuan Barang</LabelInput>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="cbo_satuan"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between">
                {value
                  ? satuan.find((data_satuan) => data_satuan.value === value)
                    ?.label
                  : "Pilih Satuan Barang"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Cari Satuan Barang"
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>Data Tidak Ditemukan !</CommandEmpty>
                  <CommandGroup>
                    {satuan.map((data_satuan) => (
                      <CommandItem
                        key={data_satuan.value}
                        value={data_satuan.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}>
                        {data_satuan.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === data_satuan.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {error.satuan && (
            <Label className={styles.error}>
              Satuan Barang Harus Dipilih !
            </Label>
          )}
        </section>

        {/* area tombol */}
        <section>
          {/* panggil reusable component ButtonPrimary 
              (components/custom/ButtonPrimary.tsx)
          */}
          <ButtonPrimary label={btn_ubah} onClick={editData} />

          {/* panggil reusable component ButtonSecondary 
              (components/custom/ButtonSecondary.tsx)
          */}
          <ButtonSecondary label={btn_batal} />
        </section>
      </article>
    </section>
  )
}
