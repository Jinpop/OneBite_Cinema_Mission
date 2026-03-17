import Link from "next/link";
import "./globals.css";
import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href="/">🍿 한입 씨네마</Link>
          </header>
          <main className={style.main}>{children}</main>
          <footer className={style.footer}>한입 씨네마 UI</footer>
        </div>
      </body>
    </html>
  );
}
