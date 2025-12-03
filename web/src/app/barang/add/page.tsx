"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import styles from "../barang.module.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { api_barang, btn_batal, btn_simpan } from "@/lib/strings";
import {
  filterHarga,
  filterHargaRaw,
  filterKode,
  filterNama,
  formatRibuan,
} from "@/lib/scripts";
import axios from "axios";
import { toast } from "sonner";

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
          <Button className="rounded-full px-8 py-2 mr-1.5" onClick={saveData}>
            {btn_simpan}
          </Button>
          <Button
            variant="secondary"
            className="rounded-full px-8 py-2 ml-1.5 bg-gray-300">
            {btn_batal}
          </Button>
        </section>
      </article>
    </section>
  );
}
