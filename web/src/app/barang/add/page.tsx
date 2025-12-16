"use client";
import ButtonSecondary from "@/components/custom/ButtonSecondary";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
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
} from "@/lib/scripts";
import { api_barang, btn_batal, btn_simpan } from "@/lib/strings";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import styles from "../barang.module.css";
import ButtonPrimary from "@/components/custom/ButtonPrimary";

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
export default function AddBarangPage() {
  // buat state untuk combobox satuan
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // buat useState
  // const [formKode, setFormKode] = useState("")
  const [formNama, setFormNama] = useState("");
  // const [formHarga, setFormHarga] = useState(0)
  // const [formSatuan, setFormSatuan] = useState("")

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

  // buat state untuk error
  // const [errorKode, setErrorKode] = useState(false);

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

  // buat fungsi untuk simpan data
  const saveData = async () => {
    const errorStatus = {
      kode: form.kode === "",
      nama: formNama === "",
      harga: form.harga === "",
      satuan: value === "",
    };

    // update kondisi error setiap komponen
    setError(errorStatus);

    // jika terjadi error (ada komponen yang tidak diisi)
    const hasError = Object.values(errorStatus).includes(true);

    // hentikan proses simpan data
    if (hasError) {
      return;
    }

    // jika tidak error (seluruh komponen sudah diisi)
    //  simpan data
    try {
      const response = await axios.post(`${api_barang}`, {
        kode: form.kode,
        nama: formNama,
        harga: form.harga_raw,
        satuan: value,
      });

      // jika success == true
      if (response.data.success) {
        toast.success(response.data.message);

        // kosongkan isi komponen
        setFormNama("");
        setValue("");
        setForm({
          ...form,
          kode: "",
          harga: "",
        });
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
      <title>Tambah Data Barang</title>

      {/* buat article */}
      <article className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {/* area kode */}
        <section>
          <Label htmlFor="txt_kode" className={styles.label}>
            Kode Barang
          </Label>
          <Input
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
          <Label htmlFor="txt_nama" className={styles.label}>
            Nama Barang
          </Label>
          <Input
            type="text"
            id="txt_nama"
            placeholder="Isi Nama Barang"
            maxLength={50}
            value={formNama}
            onChange={(value) => {
              const result = filterNama(value.target.value);
              setFormNama(result);
            }}
          />

          {error.nama && (
            <Label className={styles.error}>Nama Barang Harus Diisi !</Label>
          )}
        </section>

        {/* area harga */}
        <section>
          <Label htmlFor="txt_harga" className={styles.label}>
            Harga Barang
          </Label>
          <Input
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
          <Label htmlFor="cbo_satuan" className={styles.label}>
            Satuan Barang
          </Label>
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
          <ButtonPrimary label={btn_simpan} onClick={saveData} />

          {/* panggil reusable component ButtonSecondary 
              (components/custom/ButtonSecondary.tsx)
          */}
          <ButtonSecondary label={btn_batal} />
        </section>
      </article>
    </section>
  );
}
