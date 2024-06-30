import Link from "next/link";
import Container from "../Container";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";

import { ReactNode } from "react";

interface FooterListProps {
    children: ReactNode;
    className?: string;  // Añadido para aceptar className
}

const FooterList = ({ children, className = "" }: FooterListProps) => {
    return (
        <div className={`flex flex-col mb-8 ${className}`}>
            {children}
        </div>
    );
}

const Footer = () => {
    return (
        <footer className="bg-black text-white text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between py-16">
                    <FooterList>
                        <h3 className="text-lg font-semibold mb-4">Home Audio</h3>
                        <ul>
                            <li className="mb-2">
                                <Link href='#'>Bluetooth Speakers</Link>
                            </li>
                            <li>
                                <Link href='#'>Subwoofers</Link>
                            </li>
                        </ul>
                    </FooterList>

                    <FooterList>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul>
                            <li className="mb-2">
                                <Link href='#'>Shipping Policy</Link>
                            </li>
                            <li>
                                <Link href='#'>Product & Customer</Link>
                            </li>
                        </ul>
                    </FooterList>

                    <FooterList className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="mb-4">
                            Harman/Kardon es una división de Harman International Industries y manufactura equipos de audio para el hogar y el automóvil.
                        </p>
                        <p>&copy; {new Date().getFullYear()} E-commerce. Durgali</p>
                    </FooterList>

                    <FooterList>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <Link href='https://www.facebook.com' passHref>
                                <MdFacebook size={24} className="hover:text-gray-400" />
                            </Link>
                            <Link href='https://www.instagram.com/juandurgali03_/?next=%2F' passHref>
                                <AiFillInstagram size={24} className="hover:text-gray-400" />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
