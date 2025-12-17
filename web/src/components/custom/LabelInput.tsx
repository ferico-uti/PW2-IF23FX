import { ReactNode } from 'react';
import { Label } from '../ui/label';
import styles from "@/app/barang/barang.module.css";

// buat interface untuk label
interface LabelInputProps {
    // xyz? = optional ditambahkan saat diakses
    htmlFor?: string;
    required?: boolean;
    // xyz = wajib ditambahkan saat diakses
    children: ReactNode;
}

export default function LabelInput({ htmlFor, children, required = false }: LabelInputProps) {
    return (
        <Label htmlFor={htmlFor} className={styles.label}>
            {children}
            
            {/* tambahkan * jika wajib isi/pilih */}
            {required && <span className={styles.error}>*</span>}
        </Label>
    )
}
