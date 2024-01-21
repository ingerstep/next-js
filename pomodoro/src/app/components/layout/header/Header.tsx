"use client";

import Link from "next/link";
import { FC } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SvgEqualizer } from "@/app/components/icons/Icons";

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
          <Image
            className={styles.logo}
            src="/tomato.svg"
            alt="Pomodoro Logo"
            width={40}
            height={40}
            priority
          />
          <div className={styles.pomodoro}>pomodoro_box</div>
        </Link>

        <Link
          href="/statistics"
          className={`${pathname === "/about" ? "active" : ""}`}
        >
          <SvgEqualizer className={styles.equalizer} />

          <div className={styles.statistics}>Статистика</div>
        </Link>
      </div>
    </header>
  );
};
