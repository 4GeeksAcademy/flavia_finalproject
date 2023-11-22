import React, { useContext } from "react";
import { LogIn } from "./login.js";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context)
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
							<button className="landing-btn primary">BEGIN TODAY</button>
							<button className="landing-btn secondary">BOOK A CALL</button>
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
				<button className="benefits-button"><span></span><p data-start="good luck!" data-text="start!" data-title="new life"></p></button>
			</section>
			<section className="expert-support-section">
				<div className="support-image">
					<img src="https://legumasalud.com/wp-content/uploads/2022/07/Lunch-time-bro-1536x1536.png" alt="Support Chat" />
				</div>
				<div className="support-content">
					<h2>One-on-one expert support</h2>
					<p>Bench gives you a dedicated bookkeeper supported by a team of knowledgeable small business experts. Get a direct line to your team on desktop or mobile—professional support is just a few swipes, taps, or clicks away.</p>
					<button className="support-button">LEARN MORE</button>
				</div>
			</section>
		</>
	);
};
