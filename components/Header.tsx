import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';

const name: string = "Neon";

export default function Header({ children, home }: { children: ReactNode, home?: boolean }) {
    return (
        <header className={utilStyles.header}>
            {home ? (
                <>
                    <Image
                        priority
                        src="/images/profile.jpg"
                        className={utilStyles.borderCircle}
                        height={144}
                        width={144}
                        alt={name}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
            ) : (
                <>
                    <Link href="/">
                        <Image
                            priority
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={108}
                            width={108}
                            alt={name}
                        />
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                        <Link href="/" className={utilStyles.colorInherit}>
                            {name}
                        </Link>
                    </h2>
                </>
            )}
            <nav>
                <ul className={utilStyles.navList}>
                    <li className={utilStyles.navItem}>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className={utilStyles.navItem}>
                        <Link href="/categories">
                            Categories
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
