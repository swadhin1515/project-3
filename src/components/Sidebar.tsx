import React, { useContext, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoLibrary, IoCompass } from "react-icons/io5";
import { SiDiscord } from "react-icons/si";
import { RiUserFollowFill, RiLogoutCircleRLine } from "react-icons/ri";
import { MdDashboard, MdFeedback, MdPerson } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from "../Context";

export function Sidebar(props) {
	const [showSidebar, setShowSidebar] = useState(false);
	const [showProfileBar, setShowProfileBar] = useState(false);
	const { setShowFollower } = useContext(Context);
	const { logout } = useAuth0();
	function handleLogout() {
		props.handleLogout();
	}
	return (
		<aside className="relative lg:block hidden">
			<button
				onClick={() => setShowSidebar((prev) => !prev)}
				className=" mx-8 my-5 z-20 fixed top-0 block">
				<HiMenuAlt2 className="lg:text-2xl text-xl " />
			</button>
			<div
				className={`${
					showSidebar ? "w-max" : "w-24"
				}  h-[90vh] border-r-2 fixed z-20 bg-white p-4 transition duration-1000  flex-col justify-between flex`}>
				<ul>
					<li
						onClick={() => setShowFollower(false)}
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2  w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<AiFillHome className="text-xl" />
						<span className={`${!showSidebar && "text-xs"}`}>
							Home
						</span>
					</li>
					<li
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<IoLibrary className="text-xl" />
						<span className={`${!showSidebar && "text-xs"}`}>
							Courses
						</span>
					</li>
					<li
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<IoCompass className="text-xl" />
						<span className={`${!showSidebar && "text-xs"}`}>
							Trending
						</span>
					</li>
					<li
						onClick={() => setShowFollower(true)}
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<RiUserFollowFill className="text-xl" />
						<span className={`${!showSidebar && "text-xs"}`}>
							Following
						</span>
					</li>
					<li
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<MdDashboard className="text-xl" />
						<span className={`${!showSidebar && "text-xs"}`}>
							Dashboard
						</span>
					</li>
					<li
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<SiDiscord className="text-xl" />
						<span className={`${!showSidebar && "text-xs"}`}>
							Discord
						</span>
					</li>
					<li
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-150 cursor-pointer`}>
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 50 50"
								fill="currentColor">
								<path d="M25,2C12.297,2,2,12.297,2,25c0,12.703,10.297,23,23,23s23-10.297,23-23C48,12.297,37.703,2,25,2z M25.34,32.413 c2.527,0,4.451-1.295,5.03-3.395h2.301C32.067,32.35,29.2,34.5,25.34,34.5c-4.929,0-8.01-3.647-8.01-9.494 c0-5.86,3.068-9.506,7.997-9.506c3.823,0,6.803,2.402,7.343,5.897h-2.301c-0.604-2.339-2.54-3.81-5.042-3.81 c-3.483,0-5.671,2.867-5.671,7.419S21.844,32.413,25.34,32.413z"></path>
							</svg>
						</span>
						<span
							className={`${
								!showSidebar && "text-xs"
							} + text-center`}>
							Creater Access
						</span>
					</li>
					<li
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<MdFeedback className="text-xl" />
						<span className={`${!showSidebar && "text-xs"}`}>
							Feedback
						</span>
					</li>
					<li
						className={`${
							showSidebar ? "gap-6 pr-10" : "flex-col px-4"
						} + p-2 w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-200 cursor-pointer`}>
						<svg
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 250.93 250.93"
							width="23"
							height="20"
							fill="currentColor">
							<path d="m247.896,25.718l-25.083-17.244c-1.167-0.802-2.55-1.232-3.966-1.232h-91.706c-3.866,0-7,3.134-7,7v47.462h-88.06c-1.416,0-2.799,0.43-3.966,1.231l-25.081,17.244c-1.899,1.306-3.034,3.464-3.034,5.769s1.135,4.462 3.034,5.768l25.082,17.244c1.167,0.802 2.55,1.232 3.966,1.232h88.06v119.496h-29.224c-3.866,0-7,3.134-7,7s3.134,7 7,7h69.74c3.866,0 7-3.134 7-7s-3.134-7-7-7h-26.517v-173.959h84.706c1.416,1.42109e-14 2.799-0.43 3.966-1.232l25.082-17.243c1.899-1.306 3.034-3.463 3.034-5.769s-1.134-4.462-3.033-5.767zm-213.64,70.474l-14.9-10.244 14.9-10.244h85.885v20.488h-85.885zm182.417-54.463h-82.532v-20.487h82.532l14.9,10.244-14.9,10.243z"></path>
						</svg>
						<span className={`${!showSidebar && "text-xs"}`}>
							Tour
						</span>
					</li>
				</ul>
				<hr />
				<button
					onClick={handleLogout}
					className={`${
						showSidebar ? "gap-6 pr-10" : "flex-col"
					} + p-2  w-full items-center flex text-base hover:bg-orange-100 rounded-md transition duration-150 cursor-pointer`}>
					<RiLogoutCircleRLine className="text-xl" />
					<span className={`${!showSidebar && "text-sm"}`}>
						Logout
					</span>
				</button>
			</div>
		</aside>
	);
}
