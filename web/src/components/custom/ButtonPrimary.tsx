import React from 'react'
import { Button } from '../ui/button';

// buat interface untuk button secondary
interface ButtonPrimaryProps {
    // xyz? = optional ditambahkan saat diakses    
    label?: string;
    // xyz = wajib ditambahkan saat diakses
    onClick: () => void;
}

export default function ButtonPrimary({ label = "", onClick }: ButtonPrimaryProps) {
    return (
        <Button
            onClick={onClick}
            className={`rounded-full px-8 py-2 mr-1.5`}
        >
            {label}
        </Button>
    )
}
