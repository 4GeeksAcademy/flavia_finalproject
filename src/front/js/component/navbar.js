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
							src="https://ifeelonline.com/wp-content/uploads/2021/07/Logo-tagline-pos.svg"
						/>
					</span>
				</Link>
				<div>
					<Link to="/appointment">
						<button className="appointment_btn">
							Schedule Appointment
						</button>
					</Link>
					<Link to="/user-appointments">
						<button className="appointment_btn">
							My appointments
						</button>
					</Link>
					<Link to="/searchfood">
						<button className="appointment_btn">
							Food Database
						</button>
					</Link>
				</div>
				<div className="ml-auto">
					<button type="button" className="nav_btn" onClick={handleShowForm}>
						<i className="fa-regular fa-user"></i> Sign in
					</button>
				</div>
			</div>
		</nav>
	);
};
