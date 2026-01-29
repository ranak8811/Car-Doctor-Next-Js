import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <aside>
                <Image src="/assets/logo.svg" alt="logo" width={100} height={100} />
                <p>
                    Edwin Diaz is a software and web <br /> technologies engineer, a life coach <br /> trainer who is also a serial .
                </p>
            </aside>
            <nav>
                <header className="footer-title">About</header>
                <Link href="/" className="link link-hover">Home</Link>
                <Link href="/" className="link link-hover">Service</Link>
                <Link href="/" className="link link-hover">Contact</Link>
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <Link href="/" className="link link-hover">Why Car Doctor</Link>
                <Link href="/" className="link link-hover">About</Link>
            </nav>
            <nav>
                <header className="footer-title">Support</header>
                <Link href="/" className="link link-hover">Support Center</Link>
                <Link href="/" className="link link-hover">Feedback</Link>
                <Link href="/" className="link link-hover">Accessibility</Link>
            </nav>
        </footer>
    );
};

export default Footer;
