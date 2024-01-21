"use client";

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SvgEqualizer } from "./icons/svg-equalizer";

export const Header: FC = () => {
  const pathname = usePathname();
  return (
    <header className="px-0 py-4 text-[#DC3E22] hover:text-[#B7280F] transition-colors">
      <div className="max-w-[1440px] mx-0 my-auto py-0 px-20 flex justify-between items-center">
        <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
          <Image
            className="mr-3"
            src="/tomato.svg"
            alt="Pomodoro Logo"
            width={40}
            height={40}
            priority
          />
          <div className="font-light">pomodoro_box</div>
        </Link>

        <Link
          href="/statistics"
          className={`${pathname === "/about" ? "active" : ""}`}
        >
          <SvgEqualizer className="mr-1" />

          <div className="text-base font-normal">Статистика</div>
        </Link>
      </div>
    </header>
  );
};
