import React, { useContext } from "react";
import { LogIn } from "./login.js";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context)
	return (
		<div className="homeContainer">
			{
				store.navbar_button ? <LogIn /> : <img src="https://i.gifer.com/KFz.gif" alt="Funny image" />
			}
		</div>
	);
};
