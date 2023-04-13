import React, { useContext, useState } from "react";
import { AiFillHome, AiOutlineClockCircle } from "react-icons/ai";
import { IoCompass, IoLibrary } from "react-icons/io5";
import { MdDashboard, MdPerson } from "react-icons/md";
import {
	RiBookMarkFill,
	RiLogoutCircleRLine,
	RiUserFollowFill,
} from "react-icons/ri";
import { Context } from "../Context";

export function Bottomnav(props) {
	const [showProfileBar, setShowProfileBar] = useState(false);
	const { showFollower, setShowFollower } = useContext(Context);
	function handleLogout() {
		props.handleLogout();
	}
	return (
		<aside className="flex justify-center fixed bottom-5 w-full lg:hidden">
			<div className=" bg-white rounded-full w-[90%]">
				{showProfileBar && (
					<ul className="absolute bottom-4 pb-16 -z-10 bg-white rounded-2xl shadow-lg w-[90%]">
						<li className=" p-2 items-center gap-4 px-4 flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer">
							<MdDashboard className="text-xl" />
							<span className="text-xs">Dashboard</span>
						</li>
						<li
							className={`${
								!showFollower && "text-orange-400"
							} p-2  items-center gap-4 px-4 flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
							<MdPerson className="text-xl" />
							<span className="text-xs">My Profile</span>
						</li>
						<li className="p-2 items-center gap-4 px-4 flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer">
							<IoLibrary className="text-xl" />
							<span className="text-xs">Enrolled Courses</span>
						</li>
						<li
							onClick={() => setShowFollower(true)}
							className={`${
								showFollower && "text-orange-400"
							} + p-2 items-center gap-4 px-4 flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
							<RiUserFollowFill className="text-xl" />
							<span className="text-xs">Following</span>
						</li>
						<li className="p-2 items-center gap-4 px-4 flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer">
							<AiOutlineClockCircle className="text-xl" />
							<span className="text-xs">My Cipher Point</span>
						</li>
						<li className="p-2 items-center gap-4 px-4 flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer">
							<RiBookMarkFill className="text-xl" />
							<span className="text-xs">Wishlist</span>
						</li>
						<li className="p-2 items-center gap-4 px-4 flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer">
							<RiBookMarkFill className="text-xl" />
							<span className="text-xs">Liked Videos</span>
						</li>
						<button
							onClick={handleLogout}
							className="gap-4 px-4
					p-2  w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-150 cursor-pointer">
							<RiLogoutCircleRLine className="text-xl" />
							<span className="text-xs">Logout</span>
						</button>
					</ul>
				)}
				<ul className="flex z-20 rounded-full shadow-lg p-3">
					<li
						onClick={() => {
							setShowFollower(false);
							setShowProfileBar(false);
						}}
						className="flex-col px-4
                                        p-2  w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer">
						<AiFillHome className="text-xl" />
						<span className="text-xs">Home</span>
					</li>
					<li
						onClick={() => setShowProfileBar(false)}
						className="flex-col px-4
                                        p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer">
						<IoLibrary className="text-xl" />
						<span className="text-xs">Courses</span>
					</li>
					<li
						onClick={() => setShowProfileBar(false)}
						className={`p-2 w-full items-center flex flex-col px-4 text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<IoCompass className="text-xl" />
						<span className={`text-xs`}>Trending</span>
					</li>
					<li
						onClick={() => setShowProfileBar((prev) => !prev)}
						className={`${
							showProfileBar && "text-orange-400 bg-slate-100"
						} + flex-col px-4
                                         p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<MdPerson className="text-xl" />
						<span className="text-xs">Profile</span>
					</li>
				</ul>
			</div>
		</aside>
	);
}
