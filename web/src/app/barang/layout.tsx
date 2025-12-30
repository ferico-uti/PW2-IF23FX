import styles from "./barang.module.css"
import Image from "next/image";
import React from "react";

export default function BarangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <div>Barang</div> */}
      {/* <header className={styles.header}>
        <Image src={"/images/logo.png"} alt="Logo UTI" width={320} height={60} priority/>
      </header> */}
      <div>{children}</div>
    </div>
  );
}
