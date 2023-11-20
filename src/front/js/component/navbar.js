import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/navbar.css';
import { FaBars } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white">
			<div className="container">
				<Link to="/" className="navbar-brand mb-0 h1">
					BETTER TOGETHER
				</Link>
				<button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
					<FaBars />
				</button>

				<div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
					<Link to="/appointment" className="btn btn2 nav-link">
						<span className="spn2">Appointment</span>
					</Link>
					<Link to="/searchfood" className="btn btn2 nav-link">
						<span className="spn2">Food Database</span>
					</Link>
					<Link to="/chatbot" className="btn btn2 nav-link">
						<span className="spn2">Consultancy</span>
					</Link>
					<Link to="/blog" className="btn btn2 nav-link">
						<span className="spn2">Blog</span>
					</Link>
					<Link to="/exercises" className="btn btn2 nav-link">
						<span className="spn2">Exercises</span>
					</Link>
				</div>

				<div className="ml-auto">
					{store.validated === true ? (
						<Link to="/my-account" className="nav_btn nav-link">
							<i className="fa-regular fa-user"></i> My Account
						</Link>
					) : (
						<button type="button" className="nav_btn" onClick={actions.showForm}>
							<i className="fa-regular fa-user"></i> Sign in
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
