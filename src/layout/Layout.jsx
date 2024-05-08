import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

export function Layout() {
    return (
        <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    )
}