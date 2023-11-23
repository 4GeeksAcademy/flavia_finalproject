import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/navbar.css';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	const navigate = useNavigate();

	const handle_goToLogin = () => {
		navigate("/login")
	}

	const handle_goToMyAccount = () => {
		navigate("/my-account")
	}
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
						<span className="spn2">Consult</span>
					</Link>
					<Link to="/searchfood" className="btn btn2 nav-link">
						<span className="spn2">Food Explorer</span>
					</Link>
					<Link to="/chatbot" className="btn btn2 nav-link">
						<span className="spn2">Assistant</span>
					</Link>
					<Link to="/blog" className="btn btn2 nav-link">
						<span className="spn2">News</span>
					</Link>
					<Link to="/exercises" className="btn btn2 nav-link">
						<span className="spn2">Workout Library</span>
					</Link>
				</div>

				<div className="ml-auto">
					{store.validated === true ? (
						<button type="button" className="nav_btn" onClick={handle_goToMyAccount}>
							<i className="fa-regular fa-user"></i> My Account
						</button>
					) : (
						<button type="button" className="nav_btn" onClick={handle_goToLogin}>
							<i className="fa-regular fa-user"></i> Sign in
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
