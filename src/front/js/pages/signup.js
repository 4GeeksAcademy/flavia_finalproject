import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { LogIn } from "./login.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/login.css";
import { GoogleLogin } from '@react-oauth/google';

export const SignUp = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();

	const [newUser, setNewUser] = useState({
		full_name: '',
		email: '',
		password: '',
	});
	const [alreadyHave, setAlreadyHave] = useState(false);

	const handleAlreadyButton = () => {
		setAlreadyHave(!alreadyHave)
	}

	const handleRegister = (e) => {
		const { name, value } = e.target;
		setNewUser({
			...newUser,
			[name]: value,
		});
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		console.log('Formulario enviado:', newUser);
		const isSigned = await actions.registerUser(newUser)
		setNewUser({
			full_name: '',
			email: '',
			password: '',
		});
		if (isSigned) {
			toast.success('You have created your account. Now log in!', {
				position: "bottom-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				style: {
					backgroundColor: "rgb(122, 157, 84)",
				},
			});
			navigate('/my-account')
		};
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		const googleUser = {
			id_token: credentialResponse.credential
		};
		const isSigned = await actions.registerUser(googleUser)
		if (isSigned) {
			toast.success('You have created your account. Now log in!', {
				position: "bottom-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				style: {
					backgroundColor: "rgb(122, 157, 84)",
				},
			});
			navigate('/my-account')
		};
	};

	return (
		<>
			{
				alreadyHave ? <LogIn /> :
					<div className="loginInstance">
						<div className="login-box">
							<div className="logTitle">
								<h5>Hello!</h5>
								<p id="p" style={{ marginBottom: '2.5rem' }}> Create an account</p>
							</div>
							<form onSubmit={handleSignUp}>
								<div className="user-box">
									<input required="" name="full_name" type="text" value={newUser.full_name} onChange={handleRegister} />
									<label>Full name</label>
								</div>
								<div className="user-box">
									<input required="" name="email" type="text" value={newUser.email} onChange={handleRegister} />
									<label>Email</label>
								</div>
								<div className="user-box">
									<input required="" name="password" type="password" value={newUser.password} onChange={handleRegister} />
									<label>Password</label>
								</div>
								<button type="submit" className="login-button">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									Register
								</button>
							</form>
							<GoogleLogin
								onSuccess={credentialResponse => {
									handleGoogleSuccess(credentialResponse)
								}}
								onError={() => {
									console.log('Login Failed');
								}}
							/>
							<p>Already have an account? <a className="a2" onClick={handleAlreadyButton}>Log in!</a></p>
						</div>
					</div>
			}
		</>
	);
};