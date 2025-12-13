import Header from "../Header";
import Footer from "../Footer";
import type { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
