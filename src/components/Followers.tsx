import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
const BASE_URL = import.meta.env.VITE_BASE_URL;
type Follower = {
	id: string;
	name: string;
	picture: string;
	current_work: string;
	following: number;
};
export function Followers() {
	const { currentUser, showFollower } = useContext(Context);
	const [followers, setFollowers] = useState<any[]>([]);
	function handleFollow() {
		return;
	}
	useEffect(() => {
		console.log(currentUser.followingIDs);
		if (showFollower) getFollowers();
	}, [showFollower]);
	async function getFollowers() {
		var myHeaders = new Headers();
		// if (url === "update")
		// myHeaders.append("Authorization", `Bearer ${token}`);
		myHeaders.append("Content-Type", "application/json");
		const formData = {
			id: currentUser.id,
			email: currentUser.email,
		};

		var requestOptions: RequestInit = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(formData),
		};
		const response = await fetch(
			`${BASE_URL}/api/getFollower`,
			requestOptions
		).then(async (response) => {
			if (response.status === 200) {
				const responseData = await response.json();
				return responseData;
			}
		});
		setFollowers(response);
	}

	return (
		<div className="sm:ml-28">
			<h1 className="text-xl font-medium m-8">Users Following You</h1>
			<div className="flex flex-wrap gap-6 justify-center sm:justify-start">
				{followers ? (
					followers.map((follower) => {
						return (
							<div
								key={follower.id}
								className="shadow-lg rounded-xl p-6 px-10 justify-center flex flex-col items-center ">
								<div className="w-[5rem] max-h-[5rem] rounded-full relative mb-2 flex justify-center overflow-hidden">
									<img
										src={follower?.picture}
										alt="profile-photo"
										className=" w-auto h-full"
									/>
								</div>
								<h2>******** {follower.name.split(" ")[1]}</h2>
								<span>{follower.current_work}</span>
								<span className="text-sm mb-2">
									{follower._count.followedBy} followers
								</span>
								{currentUser.followingIDs.includes(
									follower.id
								) ? (
									<button
										onClick={handleFollow}
										className="w-full py-2 px-8 text-xs bg-slate-800 rounded-md text-white hover:bg-slate-200 hover:text-slate-800 transition duration-200">
										UnFollow
									</button>
								) : (
									<button
										onClick={handleFollow}
										className="w-full py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200">
										Follow
									</button>
								)}
							</div>
						);
					})
				) : (
					<div className="flex justify-center mt-10">
						<h1 className="text-3xl text-gray-200">
							No One Following You
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}
