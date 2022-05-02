import React from "react";
import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
	const [email, setEmailValue] = useState("");
	const [password, setPasswordValue] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();
		const loginError = document.querySelector(".loginError");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/login`,
			withCredentials: false,
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("id", res.data.userId);
				window.location = "/feed";
			})
			.catch((err) => {
				if (err.response.status === 422 && err.response.data.email) {
					loginError.innerHTML = err.response.data.email.msg;
				} else if (err.response.status === 422 && err.response.data.message) {
					loginError.innerHTML = err.response.data.message;
				} else if (err.response.data.message) {
					loginError.innerHTML = err.response.data.message;
				} else {
					console.log(err);
				}
			});
	};

	return (
		<form onSubmit={handleLogin} id="logForm">
			<label htmlFor="email">Email</label>
			<br />
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Votre adresse mail"
				onChange={(e) => setEmailValue(e.target.value)}
				value={email}
			/>
			<br />
			<label htmlFor="password">Mot de passe</label>
			<br />
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Votre mot de passe"
				onChange={(e) => setPasswordValue(e.target.value)}
				value={password}
			/>
			<div className="loginError"></div>
			<br />
			<input type="submit" value="Se connecter" />
		</form>
	);
};

export default LoginForm;
