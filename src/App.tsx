import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Banner } from "./components/Banner";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";
import { Context } from "./Context";
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from "react-cookie";
import { Bottomnav } from "./components/Bottomnav";
import { Followers } from "./components/Followers";

const BASE_URL = import.meta.env.VITE_BASE_URL;
function App() {
	// const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [signin, setSignin] = useState(true);
	const [cookies, setCookies, removeCookies] = useCookies();
	const [token, setToken] = useState(cookies["token"] || null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(cookies["user"] || null);
	const [showFollower, setShowFollower] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (token && token !== undefined) setLoggedIn(true);
	}, []);
	async function handleSignup(e) {
		if (e !== null) e.preventDefault();
		setIsLoading(true);
		try {
			const formData = {
				name: firstName + " " + lastName,
				email: email,
				password: password,
			};
			const responseData = await performFetch({
				url: "register",
				formData,
			});
			if (responseData) {
				await handleSignin(null);
			}
		} catch (error) {
			console.error(error);
		}
	}
	async function handleSignin(e) {
		if (e !== null) e.preventDefault();
		setIsLoading(true);
		const formData = {
			email: email,
			password: password,
		};
		try {
			const response = await performFetch({ url: "login", formData })
				.then((response) => {
					return response;
				})
				.catch((error) => {
					console.error(error);
				});
			if (response) {
				setToken(response.token);
				if (response.token) setCookies("token", response.token);
				setLoggedIn(true);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	}
	async function performFetch({ url, formData }) {
		var myHeaders = new Headers();
		if (url === "update")
			myHeaders.append("Authorization", `Bearer ${token}`);
		myHeaders.append("Content-Type", "application/json");

		var requestOptions: RequestInit = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(formData),
		};

		// development
		// return await fetch(`http://localhost:3000/api/${url}`, requestOptions)
		// production
		return await fetch(`${BASE_URL}/api/${url}`, requestOptions)
			.then(async (response) => {
				if (response.status !== 200) {
					const data = await response.json();
					return null;
				}
				const responseData = await response.json();
				setCurrentUser(responseData.user);
				setCookies("user", responseData.user);
				return responseData;
			})
			.catch((error) => {
				return error;
			});
	}
	function logout() {
		removeCookies("token");
		removeCookies("user");
		setToken(null);
		setCurrentUser(null);
		setLoggedIn(false);
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		setSignin(true);
	}
	if (loggedIn)
		return (
			<Context.Provider
				value={{
					currentUser,
					performFetch,
					setShowFollower,
					showFollower,
				}}>
				<Navbar />
				<Sidebar handleLogout={logout} />
				{showFollower ? (
					<Followers />
				) : (
					<>
						<Banner />
						<Main />
					</>
				)}
				<Bottomnav handleLogout={logout} />
			</Context.Provider>
		);
	else {
		return (
			<div className="flex flex-col h-screen justify-center items-center bg-slate-800 bg-opacity-10 pt-0 px-5">
				<form
					onSubmit={(e) =>
						signin ? handleSignin(e) : handleSignup(e)
					}
					className="text-center py-5 sm:py-10 bg-white rounded-2xl shadow-md xl:w-[50rem] px-5 lg:px-10">
					<header className="text-2xl text-left ">
						{signin ? "Signin" : "Signup"}
					</header>
					<h1 className="flex gap-4 text-xl font-medium items-center mt-4 justify-center">
						<img
							src="https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png"
							alt=""
							className="w-10 "
						/>
						<span>CipherSchools</span>
					</h1>
					<h2 className="text-lg mt-4">
						{signin ? "Hey, Welcome!" : "Create New Account"}
					</h2>
					<p className="text-sm sm:text-base  mb-4">
						{signin
							? "Please provide your email and password to signin"
							: "Please provide your valid information to signup"}
					</p>
					{!signin && (
						<>
							<input
								type="text"
								required
								placeholder="First Name"
								value={firstName}
								onChange={(e) =>
									setFirstName(e.currentTarget.value)
								}
								className="border-2 border-slate-200 p-3 text-base text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:outline-none focus:border-slate-200"
							/>
							<input
								type="text"
								required
								placeholder="Last Name"
								value={lastName}
								onChange={(e) =>
									setLastName(e.currentTarget.value)
								}
								className="border-2 border-slate-200 p-3 text-base  text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:outline-none focus:border-slate-200"
							/>
						</>
					)}
					<input
						type="email"
						placeholder="Email ID"
						value={email}
						required
						onChange={(e) => setEmail(e.currentTarget.value)}
						className="border-2 border-slate-200 p-3 text-base  text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:outline-none focus:border-slate-200"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						required
						onChange={(e) => setPassword(e.currentTarget.value)}
						className="border-2 border-slate-200 p-3 text-base  text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:border-slate-200"
					/>
					<button
						type="submit"
						className="flex justify-center bg-orange-400 text-white py-3 rounded-2xl w-full text-lg  hover:bg-orange-300 duration-200 transition mt-8 sm:mt-14">
						{!isLoading ? (
							`${signin ? "Signin" : "Create Account"}`
						) : (
							<img
								src="https://samherbert.net/svg-loaders/svg-loaders/three-dots.svg"
								alt=""
								className="w-10"
							/>
						)}
					</button>
					<p className="text-sm sm:text-base  mt-4">
						{signin
							? "Don't have an account ? "
							: "Already have an account ? "}
						<button
							type="button"
							className="text-orange-400"
							onClick={() => setSignin((prev) => !prev)}>
							{signin ? "Get Started" : "Signin Now"}
						</button>
					</p>
				</form>
			</div>
		);
	}
}

export default App;
