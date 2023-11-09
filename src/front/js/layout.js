import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { LogIn } from "./pages/login";
import { MyAccount } from "./pages/myaccount";
import { Appointment } from "./pages/appointment";
import { Payment } from "./pages/payment";
import { UserAppointments } from "./pages/user_appointments";
import { Videocall } from "./pages/videocall";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <ToastContainer />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<MyAccount />} path="/my-account" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<Appointment />} path="/appointment" />
                        <Route element={<Payment />} path="/payment" />
                        <Route element={<UserAppointments />} path="/user-appointments" />
                        <Route element={<Videocall />} path="/videocall/:jitsiRoomId" />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);