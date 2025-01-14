"use client";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex flex-col size-full gap-4">
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
        </Link>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((el) => {
                const isActive = pathName === el.route;
                return (
                  <li key={el.route} className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"}`}>
                    <Link href={el.route} className="sidebar-link">
                      <Image src={el.icon} alt="logo" width={24} height={24} className={`${isActive && "brightness-200"}`} />
                      {el.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((el) => {
                const isActive = pathName === el.route;
                return (
                  <li key={el.route} className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"}`}>
                    <Link href={el.route} className="sidebar-link">
                      <Image src={el.icon} alt="logo" width={24} height={24} className={`${isActive && "brightness-200"}`} />
                      {el.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton showName />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
