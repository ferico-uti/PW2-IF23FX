import { ChangeEvent } from 'react';
import { Input } from '../ui/input';

// buat interface untuk input text
interface InputTextProps {
    // xyz? = optional ditambahkan saat diakses    
    type?: string;
    id?: string;
    placeholder?: string;
    maxLength?: number;
    value: string;
    // xyz = wajib ditambahkan saat diakses
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText({ type, id, placeholder, maxLength, value, onChange }: InputTextProps) {
    return (
        <Input
            type={type}
            id={id}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
        />
    )
}
