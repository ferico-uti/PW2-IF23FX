import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

// buat interface untuk button secondary
interface ButtonSecondaryProps {
    // xyz? = optional ditambahkan saat diakses    
    label?: string;
}

export default function ButtonSecondary({ label = "" }: ButtonSecondaryProps) {
    // buat variabel untuk router
    const router = useRouter();

    return (
        <Button
            variant="secondary"
            onClick={() => router.back()}
            className={`rounded-full px-8 py-2 ml-1.5 bg-gray-300`}
        >
            {label}
        </Button>
    )
}
