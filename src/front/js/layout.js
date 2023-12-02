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
import { SearchFood } from "./pages/searchfood";
import { FoodInfo } from "./pages/foodInfo";
import { ChatBot } from "./pages/chatbot";
import { NewsSearch } from "./pages/newsSearch";
import { Exercises } from "./pages/exercises";
import { UserFavFoods } from "./pages/user_fav_foods";
import { UserFavWorkouts } from "./pages/user_fav_workouts";
import { UserFavArticles } from "./pages/user_fav_articles";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
                            <Route element={<SearchFood />} path="/searchfood" />
                            <Route element={<FoodInfo />} path="/get-nutrients" />
                            <Route element={<ChatBot />} path="/chatbot" />
                            <Route element={<NewsSearch />} path="/blog" />
                            <Route element={<Exercises />} path="/exercises" />
                            <Route element={<UserFavFoods />} path="/user-fav-foods" />
                            <Route element={<UserFavWorkouts />} path="/user-fav-workouts" />
                            <Route element={<UserFavArticles />} path="/user-fav-articles" />
                            <Route path="*" element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                    </GoogleOAuthProvider>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);