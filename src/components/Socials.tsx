import React, { useContext, useState } from "react";
import { BsFacebook, BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { Context } from "../Context";
export function Socials() {
	const { performFetch, currentUser } = useContext(Context);
	const [linkedin, setLinkedin] = useState(currentUser.linkedin || null);
	const [github, setGithub] = useState(currentUser.github || null);
	const [facebook, setFacebook] = useState(currentUser.facebook || null);
	const [twitter, setTwitter] = useState(currentUser.twitter || null);
	const [instagram, setInstagram] = useState(currentUser.instagram || null);
	const [website, setWebsite] = useState(currentUser.website || null);
	const [isEditing, setIsEditing] = useState(false);

	async function handleSave() {
		try {
			const formData = {
				email: currentUser.email,
				linkedin: linkedin,
				github: github,
				facebook: facebook,
				twitter: twitter,
				instagram: instagram,
				website: website,
			};
			await performFetch({ url: "update", formData });
		} catch (err) {
			console.error(err);
		} finally {
			setIsEditing(false);
		}
	}
	return (
		<section className="border-b-2 pb-10 mt-10 lg:mx-10 lg:ml-40 mx-4">
			<header className="flex justify-between items-center mb-4">
				<h1 className="font-bold text-base">ON THE WEB</h1>
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
			<div className="grid lg:grid-cols-3 grid-cols-1 gap-x-10 gap-y-4">
				<div>
					<h2 className="text-base font-medium text-gray-600 mb-2">
						Linkedin
					</h2>
					<div className="bg-white p-2 rounded-lg flex gap-4 items-center relative">
						<BsLinkedin className="rounded-full text-gray-400 placeholder:text-gray-400 text-2xl" />
						<input
							type="text"
							className="text-base  text-gray-700 outline-none border-none focus:ring-0 w-full "
							placeholder="Linkedin"
							defaultValue={linkedin}
							onChange={(e) => setLinkedin(e.currentTarget.value)}
							disabled={!isEditing}
						/>
						{isEditing && (
							<MdModeEdit className="text-lg text-gray-700 placeholder:text-gray-400 right-4 absolute" />
						)}
					</div>
				</div>
				<div>
					<h2 className="text-base font-medium text-gray-600 mb-2">
						Github
					</h2>
					<div className="bg-white p-2 rounded-lg flex gap-4 items-center relative">
						<BsGithub className="rounded-full text-gray-400 placeholder:text-gray-400 text-2xl" />
						<input
							type="text"
							className="text-base  text-gray-700 placeholder:text-gray-400 outline-none border-none focus:ring-0 w-full"
							placeholder="Github"
							defaultValue={github}
							onChange={(e) => setGithub(e.currentTarget.value)}
							disabled={!isEditing}
						/>
						{isEditing && (
							<MdModeEdit className="text-lg text-gray-700 placeholder:text-gray-400 right-4 absolute" />
						)}
					</div>
				</div>
				<div>
					<h2 className="text-base font-medium text-gray-600 mb-2">
						Facebook
					</h2>
					<div className="bg-white p-2 rounded-lg flex gap-4 items-center relative">
						<BsFacebook className="rounded-full text-gray-400 placeholder:text-gray-400 text-2xl" />
						<input
							type="text"
							className="text-base  text-gray-700 placeholder:text-gray-400 outline-none border-none focus:ring-0 w-full"
							placeholder="Facebook"
							defaultValue={facebook}
							onChange={(e) => setFacebook(e.currentTarget.value)}
							disabled={!isEditing}
						/>
						{isEditing && (
							<MdModeEdit className="text-lg text-gray-700 placeholder:text-gray-400 right-4 absolute" />
						)}
					</div>
				</div>
				<div>
					<h2 className="text-base font-medium text-gray-600 mb-2">
						Twitter
					</h2>
					<div className="bg-white p-2 rounded-lg flex gap-4 items-center relative">
						<BsTwitter className="rounded-full text-gray-400 placeholder:text-gray-400 text-2xl" />
						<input
							type="text"
							className="text-base  text-gray-700 placeholder:text-gray-400 outline-none border-none focus:ring-0 w-full"
							placeholder="Twitter"
							defaultValue={twitter}
							onChange={(e) => setTwitter(e.currentTarget.value)}
							disabled={!isEditing}
						/>
						{isEditing && (
							<MdModeEdit className="text-lg text-gray-700 placeholder:text-gray-400 right-4 absolute" />
						)}
					</div>
				</div>
				<div>
					<h2 className="text-base font-medium text-gray-600 mb-2">
						Instagram
					</h2>
					<div className="bg-white p-2 rounded-lg flex gap-4 items-center relative">
						<FaInstagramSquare className="rounded-full text-gray-400 placeholder:text-gray-400 text-2xl" />
						<input
							type="text"
							className="text-base  text-gray-700 placeholder:text-gray-400 outline-none border-none focus:ring-0 w-full"
							placeholder="Instagram"
							defaultValue={instagram}
							onChange={(e) =>
								setInstagram(e.currentTarget.value)
							}
							disabled={!isEditing}
						/>
						{isEditing && (
							<MdModeEdit className="text-lg text-gray-700 placeholder:text-gray-400 right-4 absolute" />
						)}
					</div>
				</div>
				<div>
					<h2 className="text-base font-medium text-gray-600 mb-2">
						Website
					</h2>
					<div className="bg-white p-2 rounded-lg flex gap-4 items-center relative">
						<TbWorld className="rounded-full text-gray-400 placeholder:text-gray-400 text-2xl" />
						<input
							type="text"
							className="text-base  text-gray-700 placeholder:text-gray-400 outline-none border-none focus:ring-0 w-full"
							placeholder="Website"
							defaultValue={website}
							onChange={(e) => setWebsite(e.currentTarget.value)}
							disabled={!isEditing}
						/>
						{isEditing && (
							<MdModeEdit className="text-lg text-gray-700 placeholder:text-gray-400 right-4 absolute" />
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
