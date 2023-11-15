import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const handleShowForm = () => {
		actions.showForm()
	}

	return (
		<nav className="navbar navbar-light bg-white">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<img
							className="icon"
							src="https://cdn1.iconfinder.com/data/icons/minimal-fruit/128/apple-512.png"
						/>
					</span>
				</Link>
				<div>
					<Link to="/appointment">
						<button className="appointment_btn">
							Schedule Appointment
						</button>
					</Link>
					<Link to="/searchfood">
						<button className="appointment_btn">
							Food Database
						</button>
					</Link>
					<Link to="/chatbot">
						<button className="appointment_btn">
							Chatbot
						</button>
					</Link>
					<Link to="/blog">
						<button className="appointment_btn">
							Blog
						</button>
					</Link>
					<Link to="/exercises">
						<button className="appointment_btn">
							Exercises
						</button>
					</Link>
				</div>
				<div className="ml-auto">
					{store.validated === true ? (
						// Si el usuario está autenticado, mostrar "My Account"
						<Link to="/my-account">
							<button className="nav_btn">
								<i className="fa-regular fa-user"></i> My Account
							</button>
						</Link>
					) : (
						// Si no, mostrar "Sign in"
						<button type="button" className="nav_btn" onClick={handleShowForm}>
							<i className="fa-regular fa-user"></i> Sign in
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
