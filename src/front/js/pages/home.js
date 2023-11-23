import React, { useContext } from "react";
import { LogIn } from "./login.js";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();

	const handle_goToLogin = () => {
		navigate("/login")
	}

	const handle_goToAppointment = () => {
		navigate("/appointment")
	}

	const handle_goToFoodDatabase = () => {
		navigate("/searchfood")
	}

	const handle_goToAssistant = () => {
		navigate("/chatbot")
	}

	const handle_goToNews = () => {
		navigate("/blog")
	}

	const handle_goToExercises = () => {
		navigate("/exercises")
	}
	return (
		<>
			<header className="landing-header">
				<div className="landing-content-wrapper">
					<div className="landing-text-section">
						<h1>Feeding Your Life.<br />Nourishing Your Future.</h1>
						<p>
							Discover a healthier you with Better Together, offering easy access to professional nutritionists, AI-driven nutritional advice, and a comprehensive fitness library. Stay informed and empowered on your wellness journey.
						</p>
						<div className="landing-cta-buttons">
							<button className="landing-btn primary" onClick={handle_goToLogin}>BEGIN TODAY</button>
							<button className="landing-btn secondary" onClick={handle_goToAppointment}>BOOK A CALL</button>
						</div>
						<p className="landing-bookkeeping-offer">Join the Nutrition Revolution. Book with Our Nutritionists.</p>
					</div>
					<div className="landing-image-section">
						<img src="https://vynutrition.ie/wp-content/uploads/2022/09/Change-the-way-you-eat-VY-Nutrition.png" alt="Financial Graph" />
					</div>
				</div>
			</header>
			<section className="testimonials">
				<h2>Applauded by Health-Conscious Early Members</h2>
				<div className="testimonials-container">
					<div className="testimonial">
						<blockquote>
							“This service has made my journey to healthy nutrition completely transparent. No more guessing or getting lost in confusing information.”
						</blockquote>
						<div className="testimonial-author">
							<img src="https://assets-global.website-files.com/645d153299ce00e5b32eb70b/646662112ca0593ec4b9f9ba_justin-metros.png" alt="Justin Metros" />
							<p>Justin Metros<br /><span>Wellness Advocate</span></p>
						</div>
					</div>
					<div className="testimonial">
						<blockquote>
							“Now that this service offers personalized nutrition plans, it's a 'one-stop shop' for anyone looking to manage their diet and wellness goals.”
						</blockquote>
						<div className="testimonial-author">
							<img src="https://assets-global.website-files.com/645d153299ce00e5b32eb70b/64665faa25082de9184c6622_download.jpeg" alt="Albert Lamont" />
							<p>Albert Lamont<br /><span>Wellness Advocate</span></p>
						</div>
					</div>
					<div className="testimonial">
						<blockquote>
							“I feel better knowing that professionals are handling my nutritional needs so I can spend more time enjoying life instead of worrying about meal details.”
						</blockquote>
						<div className="testimonial-author">
							<img src="https://assets-global.website-files.com/645d153299ce00e5b32eb70b/64b6ce4dd2c90254ee1fd4c4_LauraSimms-p-500.png" alt="Laura Simms" />
							<p>Laura Simms<br /><span>Wellness Advocate</span></p>
						</div>
					</div>
				</div>
			</section>
			<section className="benefits-section">
				<div className="benefits-header">
					<img src="https://cdn-icons-png.flaticon.com/512/3373/3373025.png" alt="Shield Icon" className="benefits-icon" />
					<h2>What you get with Better Together</h2>
				</div>
				<p>Elevate your well-being with Better Together. Access expert nutritionists, AI-driven guidance, and a fitness library. Achieve your health goals effortlessly.</p>
				<button className="benefits-button" onClick={handle_goToLogin}><span></span><p data-start="good luck!" data-text="start!" data-title="new life"></p></button>
			</section>
			<section className="expert-support-section">
				<div className="support-image">
					<img src="https://legumasalud.com/wp-content/uploads/2022/07/Lunch-time-bro-1536x1536.png" alt="Support Chat" />
				</div>
				<div className="support-content">
					<h2>One-on-one expert support</h2>
					<p>Access professional nutritionists and receive tailored advice on your diet and wellbeing. Easily connect with our experts from your computer or mobile, and begin transforming your health with just a few clicks.</p>
					<button className="support-button" onClick={handle_goToAppointment}>LEARN MORE</button>
				</div>
			</section>
			<section className="expert-support-section">
				<div className="support-content">
					<h2>Explore the World of Nutrition</h2>
					<p>Discover our extensive database of dishes and ingredients, and get detailed nutritional information. Whether from your mobile or desktop device, the information you need to make informed food choices is at your fingertips.</p>
					<button className="support-button" onClick={handle_goToFoodDatabase}>LEARN MORE</button>
				</div>
				<div className="support-image">
					<img src="https://legumasalud.com/wp-content/uploads/2022/07/Pasta-bro-1536x1536.png" alt="Food Database" />
				</div>
			</section>
			<section className="expert-support-section">
				<div className="support-image">
					<img src="https://legumasalud.com/wp-content/uploads/2022/07/Headache-bro-1536x1536.png" alt="Assistant" />
				</div>
				<div className="support-content">
					<h2>Personalised Advice with AI</h2>
					<p>Utilise our intelligent AI-based assistant for personalised nutrition and wellness advice. Accessible from any device, this assistant provides recommendations tailored to your health needs and goals.</p>
					<button className="support-button" onClick={handle_goToAssistant}>LEARN MORE</button>
				</div>
			</section>
			<section className="expert-support-section">
				<div className="support-content">
					<h2>Stay Informed on Health and Nutrition</h2>
					<p>Our news section offers you the latest updates and research in the world of health. Enjoy easy and quick access to relevant and reliable information, helping you to stay up-to-date on nutrition and wellness topics.</p>
					<button className="support-button" onClick={handle_goToNews}>LEARN MORE</button>
				</div>
				<div className="support-image">
					<img src="https://legumasalud.com/wp-content/uploads/2023/01/Eating-disorder-bro-1024x1024.png" alt="News" />
				</div>
			</section>
			<section className="expert-support-section">
				<div className="support-image">
					<img src="https://legumasalud.com/wp-content/uploads/2022/07/Boost-your-inmune-system-bro-1-1024x1024.png" alt="Workout library" />
				</div>
				<div className="support-content">
					<h2>Your Library of Physical Activities</h2>
					<p>Explore our library of exercise videos and tutorials, designed to complement your nutrition and wellness regimen. From beginners to advanced, find exercise routines that match your fitness goals and level, all from the comfort of your home.</p>
					<button className="support-button" onClick={handle_goToExercises}>LEARN MORE</button>
				</div>
			</section>
		</>
	);
};
