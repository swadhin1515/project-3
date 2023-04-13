import React, { useContext, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Context } from "../Context";

export function Security() {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<section className="border-b-2 pb-10 mt-10 lg:mx-10 lg:ml-40 mx-4">
				<header className="flex justify-between items-center mb-4 ">
					<h1 className="font-bold text-base">PASSWORD & SECURITY</h1>
					<button
						onClick={() => setShowModal((prev) => !prev)}
						className="py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200
                                "
						disabled={showModal}>
						Change
					</button>
				</header>
				<div className="">
					<h2 className="text-base font-medium mb-2 text-gray-600">
						Password
					</h2>
					<div className="p-2 px-4 text-base text-gray-600 rounded-lg items-center bg-white flex justify-between">
						<span className="text-bold text-2xl -translate-y-2">
							....................
						</span>
					</div>
				</div>
			</section>
			{showModal && <PasswordChangeModal setShowModal={setShowModal} />}
		</>
	);
}
function PasswordChangeModal(props) {
	const { performFetch, currentUser } = useContext(Context);
	const oldPassword = useRef<HTMLInputElement>(null);
	const newPassword = useRef<HTMLInputElement>(null);
	const confirmPassword = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");
	async function handleSave() {
		setError("");
		if (
			oldPassword.current &&
			newPassword.current &&
			confirmPassword.current &&
			newPassword.current?.value === confirmPassword.current?.value
		) {
			try {
				const formData = {
					email: currentUser.email,
					password: newPassword.current?.value,
					oldPassword: oldPassword.current?.value,
					currentPassword: currentUser.password,
				};
				await performFetch({ url: "update", formData });
			} catch (err) {
				setError(err);
				console.error(err);
			} finally {
				if (error === "") {
					props.setShowModal(false);
					setError("");
				}
			}
		} else {
			setError("Password not matching");
		}
	}
	return (
		<div className="z-30   bg-orange-900 bg-opacity-10 w-screen h-screen fixed top-0 flex justify-center items-center">
			<div className="flex flex-col bg-white px-10 py-6 rounded-lg">
				{error !== "" && (
					<div className="text-white text-base bg-red-400 p-2">
						{error}
					</div>
				)}
				<label
					htmlFor="current-password"
					className="mt-4 mb-2 font-medium text-base text-slate-600">
					Current Password
				</label>
				<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between w-80 lg:w-[40rem]">
					<input
						type="password"
						id="current-password"
						className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
						placeholder="Current Password"
						ref={oldPassword}
					/>
				</div>
				<label
					htmlFor="new-password"
					className="mt-4 mb-2 font-medium text-base text-slate-600">
					New Password
				</label>
				<div className="w-80 lg:w-[40rem] flex bg-slate-100 rounded-lg px-4 py-2 justify-between">
					<input
						type="password"
						id="new-password"
						className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
						placeholder="New Password"
						ref={newPassword}
					/>
				</div>
				<label
					htmlFor="confirm-password"
					className="mt-4 mb-2 font-medium text-base text-slate-600">
					Confirm Password
				</label>
				<div className="flex bg-slate-100 w-80 lg:w-[40rem] rounded-lg px-4 py-2 justify-between">
					<input
						type="password"
						id="confirm-password"
						className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
						placeholder="Confirm Password"
						ref={confirmPassword}
					/>
				</div>

				<div className="flex gap-4 mt-8 justify-end">
					<button
						onClick={() => props.setShowModal(false)}
						className="py-2 px-10 text-xs bg-gray-900 rounded-md text-white hover:bg-gray-700 transition duration-200">
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200">
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
