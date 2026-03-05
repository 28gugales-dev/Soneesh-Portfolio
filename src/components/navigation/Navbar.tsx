"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import clsx from "clsx";

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Research", href: "/research" },
        { name: "Leadership", href: "/leadership" },
        { name: "Achievements", href: "/achievements" },
        { name: "Media", href: "/media" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <div className={styles.navWrapper}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/" className="sans">SONEESH K</Link>
                </div>
                <div className={styles.links}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(pathname === link.href && styles.active)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
