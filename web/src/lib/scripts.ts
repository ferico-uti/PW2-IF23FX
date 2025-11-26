// buat fungsi untuk format ribuan (harga)
export const formatRupiah = (text: number) => {
    return text.toLocaleString("id-ID");
}

// buat fungsi regex untuk format kode
export const filterKode = (value: string): string => {
    return value.replace(/[^0-9a-zA-Z-]/g, '');
}

// buat fungsi regex untuk format nama
export const filterNama = (value: string): string => {
    return value.replace(/[^0-9a-zA-Z'" ]/g, '');
}

// buat fungsi regex untuk format harga
export const filterHarga = (value: string): string => {
    return value.replace(/[^0-9]/g, '');
}

export const filterHargaRaw = (value: string): string => {
    return value.replace(/\./g, '');
}

export const formatRibuan = (value: string): string => {
    const numeric = value.replace(/[^0-9]/g, '').replace(/^0+/, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};