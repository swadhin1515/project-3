import React, { useContext, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Context } from "../Context";
export function About() {
	const [isEditing, setIsEditing] = useState(false);
	const { performFetch, currentUser } = useContext(Context);
	const [about, setAbout] = useState(currentUser.about);
	async function handleSave() {
		console.log(about);
		try {
			const formData = {
				email: currentUser.email,
				about: about,
			};
			await performFetch({ url: "update", formData });
		} catch (err) {
			console.error(err);
		} finally {
			setIsEditing(false);
		}
	}
	return (
		<section className="border-b-2 pb-10 lg:mx-10 lg:ml-40 mx-4 pt-10">
			<header className="flex justify-between items-center mb-4">
				<h1 className="font-bold text-base">ABOUT ME</h1>
				{!isEditing ? (
					<button
						onClick={() => setIsEditing(true)}
						className="py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200">
						Edit
					</button>
				) : (
					<button
						onClick={handleSave}
						className="py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200">
						Save
					</button>
				)}
			</header>
			<div className="flex items-center bg-white pr-6">
				<textarea
					className="focus:ring-0 bg-white rounded-lg w-full h-40 p-6 text-gray-600 text-base outline-none border-none resize-none"
					placeholder="Add Something about you."
					defaultValue={about}
					onChange={(e) => setAbout(e.currentTarget.value)}
					disabled={!isEditing}
				/>
				{isEditing && <MdModeEdit className="text-lg text-gray-400" />}
			</div>
		</section>
	);
}
