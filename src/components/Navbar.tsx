import { AiOutlineBell, AiOutlineCompass } from "react-icons/ai";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import React, { useContext, useState } from "react";
import {
	RiArrowDropDownLine,
	RiArrowDropUpLine,
	RiEqualizerLine,
} from "react-icons/ri";
import { Context } from "../Context";

export function Navbar() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [browseModalVisible, setBrowseModalVisible] = useState(false);
	const { currentUser } = useContext(Context);
	return (
		<nav className="border-b-2 py-2 lg:px-10 px-2 sticky top-0 w-full z-20 bg-white">
			<ul className="flex justify-between">
				<li className="flex sm:gap-2 sm:justify-between w-full">
					<div className="logo flex items-center gap-2 cursor-pointer col-span-2 lg:ml-14">
						<img
							src="https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png"
							className="nav-logo h-5 w-5 sm:w-9 sm:h-9"
							alt="cipherschools-logo"
						/>
						<h1 className="lg:text-xl font-bold font-primary">
							CipherSchools
						</h1>
					</div>
					<div className="flex items-center ml-2">
						<div className="relative">
							<button
								className="flex items-center gap-1"
								onClick={() =>
									setBrowseModalVisible((prev) => !prev)
								}>
								<AiOutlineCompass className="text-lg" />
								<span className="text-xs">Browse</span>
								{browseModalVisible ? (
									<RiArrowDropUpLine className="text-lg" />
								) : (
									<RiArrowDropDownLine className="text-lg" />
								)}
							</button>
							<div
								className={
									`flex flex-col z-20 pb-2 shadow-lg w-max rounded-lg bg-white absolute top-10 transition duration-500 overflow-hidden ease-in-out ` +
									`${
										browseModalVisible
											? `opacity-100`
											: `opacity-0 h-0 w-0`
									}`
								}>
								<a
									href="#"
									className="hover:bg-slate-100 py-1 px-6 transition duration-200 text-sm">
									App Development
								</a>
								<a
									href="#"
									className="hover:bg-slate-100  py-1 px-6 transition duration-200 text-sm">
									Web Development
								</a>
								<a
									href="#"
									className="hover:bg-slate-100  py-1 px-6 transition duration-200 text-sm">
									Game Development
								</a>
								<a
									href="#"
									className="hover:bg-slate-100  py-1 px-6 transition duration-200 text-sm">
									Data Structures
								</a>
								<a
									href="#"
									className="hover:bg-slate-100  py-1 px-6 transition duration-200 text-sm">
									Programming
								</a>
								<a
									href="#"
									className="hover:bg-slate-100  py-1 px-6 transition duration-200 text-sm">
									Machine Learning
								</a>
								<a
									href="#"
									className="hover:bg-slate-100  py-1 px-6 transition duration-200 text-sm">
									Data Science
								</a>
								<a
									href="#"
									className="hover:bg-slate-100  py-1 px-6 transition duration-200 text-sm">
									Others
								</a>
							</div>
						</div>
					</div>
				</li>
				<li className="flex lg:gap-10 gap-4 items-center text-xl">
					<div className="border-2 rounded-2xl bg-gray-100 xl:flex hidden items-center px-6">
						<FiSearch className="text-base text-gray-500 cursor-pointer hidden lg:inline-block " />
						<input
							type="text"
							placeholder="Search and learn"
							className="lg:w-96  border-none  bg-gray-100 focus:ring-0"
						/>
						<button>
							<RiEqualizerLine className="text-lg" />
						</button>
					</div>
					<AiOutlineBell className=" cursor-pointer lg:inline hidden sm:text-4xl" />
					<button className=" hidden rounded-full lg:flex justify-center w-10 max-h-10">
						<img
							src={currentUser.picture}
							alt="profile-photo"
							className="rounded-full "
						/>
					</button>
					<button className="lg:flex items-center justify-center gap-2 hidden">
						<img
							src="https://www.cipherschools.com/static/media/WatchPoints.1caa87d88b88c0d4b4ee24fdd5b1db3f.svg"
							alt=""
						/>
						<span> 0</span>
					</button>
					<div>
						<span
							className="text-sm flex items-center gap-2 text-yellow-500  bg-[#4d4d4d] p-1 rounded-2xl max-w-fit cursor-pointer relative"
							onClick={() => setIsDarkMode((prev) => !prev)}>
							<BsFillMoonFill />
							<BsFillSunFill />
							{isDarkMode ? (
								<span className="h-6 w-6 right-0 border-yellow-500 border-[3px] bg-white absolute rounded-full"></span>
							) : (
								<span className="h-6 w-6 left-0 border-yellow-500 border-[3px] bg-white absolute rounded-full"></span>
							)}
						</span>
					</div>
					<AiOutlineBell className="text-lg cursor-pointer lg:hidden inline" />
					<FiSearch className="text-lg cursor-pointer lg:hidden inline" />
				</li>
			</ul>
		</nav>
	);
}
