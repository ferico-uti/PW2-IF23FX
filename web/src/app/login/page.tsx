"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../barang/barang.module.css";
import LabelInput from "@/components/custom/LabelInput";
import InputText from "@/components/custom/InputText";
import ButtonPrimary from "@/components/custom/ButtonPrimary";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    // buat variabel useRouter
    const router = useRouter();
    // buat variabel untuk respon zustand
    // sumber : store/useAuth.ts
    const login = useAuth((state) => state.login);
    const error = useAuth((state) => state.error);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // jika login sukses alihkan ke homepage
        const success = login(username, password);
        if (success) {
            router.push("/");
        }
    };

    return (
        <section className={`${styles.page} `}>
            <title>Login</title>

            <section className="flex items-center justify-center">
                <section className={`${styles.page} w-full md:w-1/2 p-8 border border-gray-300 rounded-md bg-white`}>
                    <section className="mb-5">
                        {/* panggil reusable component LabelInput 
                            (components/custom/LabelInput.tsx)
                        */}
                        <LabelInput htmlFor="txt_username" required>Username</LabelInput>
                        {/* panggil reusable component InputText 
                            (components/custom/InputText.tsx)
                        */}
                        <InputText
                            type="text"
                            id="txt_username"
                            placeholder="Username (isi admin)"
                            maxLength={10}
                            value={username}
                            onChange={(value) => setUsername(value.target.value)}
                        />
                    </section>

                    <section className="mb-5">
                        {/* panggil reusable component LabelInput 
                            (components/custom/LabelInput.tsx)
                        */}
                        <LabelInput htmlFor="txt_password">Password</LabelInput>
                        {/* panggil reusable component InputText 
                            (components/custom/InputText.tsx)
                        */}
                        <InputText
                            type="password"
                            id="txt_password"
                            placeholder="Password (isi admin)"
                            maxLength={10}
                            value={password}
                            onChange={(value) => setPassword(value.target.value)}
                        />
                    </section>

                    <section className="mb-5">
                        {/* tampilkan error dari zustand jika gagal login */}
                        {error && <Label style={{ color: "red" }}>{error}</Label>}
                    </section>

                    <section className="mb-5">
                        {/* panggil reusable component LabelInput 
                            (components/custom/ButtonPrimary.tsx)
                        */}
                        <ButtonPrimary label="Login" onClick={handleLogin} />
                    </section>
                </section>
            </section>
        </section>
    );
}
