import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { LogIn } from "./login.js";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/myaccount.css";

export const MyAccount = () => {
    const { store, actions } = useContext(Context);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        actions.myAccount(accessToken).then((data) => {
            if (data) {
                setValidated(true);
            };
        }).catch(err => console.log(err))
    };

    const handleLogOut = () => {
        actions.logOut();
        sessionStorage.removeItem('accessToken');
        toast('You are logged out. Come back soon!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                backgroundColor: "rgb(167, 130, 149)",
                color: "white"
            },
        });
        navigate('/')
    }
    return (
        <>
            {
                validated ?
                    <div className="myAccountMain">
                        <div className="containerMyAccount">
                            <div className="optionMyAccount"><i className="fa-solid fa-circle-user"></i>Your personal data</div>
                            <div className="optionMyAccount"><i className="fa-solid fa-location-dot"></i>Addresses</div>
                            <div className="optionMyAccount"><i className="fa-regular fa-file-lines"></i><Link to="/user-appointments">My appointments</Link></div>
                            <div className="optionMyAccount"><i className="fa-solid fa-receipt"></i>Order returns</div>
                            <div className="optionMyAccount"><i className="fa-solid fa-envelope-open"></i>My alerts</div>
                            <div className="optionMyAccount"><i className="fa-solid fa-user-shield"></i>Data protection</div>
                        </div>
                        <button onClick={handleLogOut}>Log out</button>
                    </div>
                    : <div className="loginInstance"><LogIn /></div>
            }
        </>
    )
}