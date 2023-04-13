import React, { useContext, useRef, useState } from "react";
import { MdCancel, MdEdit } from "react-icons/md";
import { Context } from "../Context";
import ImageUploading from "react-images-uploading";
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
export function Banner() {
	const { currentUser, setShowFollower } = useContext(Context);
	const [showModal, setShowModal] = useState(false);
	return (
		<section className="bg-banner-pattern  py-3 flex items-center justify-between banner relative border-b-2 ">
			<div className="grid grid-cols-3 z-10 items-center gap-x-2 lg:ml-24 px-5">
				<div className="row-span-3 col-span-1 flex items-center justify-center">
					<div className="flex flex-col items-center relative w-3/5">
						<div className="w-[5rem] max-h-[5rem] rounded-full relative  flex justify-center overflow-hidden">
							<img
								src={currentUser?.picture}
								alt="profile-photo"
								className=" w-auto h-full"
							/>
						</div>
						<button
							onClick={() => setShowModal(true)}
							className="bg-[#202b47] text-white p-1 rounded-full max-w-fit lg:text-lg absolute -bottom-2">
							<MdEdit />
						</button>
					</div>
				</div>
				<span className="sm:text-lg lg:text-xl col-span-2 ">
					Hello,
				</span>
				<span className="text-lg lg:text-2xl col-span-2 font-bold leading-4">
					{currentUser?.name}
				</span>
				<span className="text-sm sm:text-base lg:text-lg col-span-2 leading-9">
					{currentUser?.email}
				</span>
			</div>
			<button
				className="z-10 text-sm sm:text-lg font-medium mr-5 flex gap-1 "
				onClick={() => setShowFollower(true)}>
				<span>{currentUser.followedByIDs.length} </span>
				<span>Followers</span>
			</button>
			{showModal && <ProfileEditModal setShowModal={setShowModal} />}
		</section>
	);
}
type Image = {
	data_url: string;
	file: File;
};
function ProfileEditModal(props) {
	const { performFetch, currentUser } = useContext(Context);
	const firstName = useRef<HTMLInputElement>(null);
	const lastName = useRef<HTMLInputElement>(null);
	const number = useRef<HTMLInputElement>(null);
	const [images, setImages] = useState<Image[]>([]);
	const [error, setError] = useState("");
	async function handleSave() {
		setError("");
		const form = new FormData();
		form.append("image", images[0].file);
		const responseData = await fetch(
			`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
			{
				method: "POST",
				body: form,
			}
		)
			.then(async (response) => {
				return await response.json();
			})
			.catch((err) => {
				console.error(err);
				setError(err);
			});
		if (responseData) {
			try {
				const formData = {
					email: currentUser.email,
					picture: responseData.data.url,
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
		}
	}

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
	};
	return (
		<div className="z-30 bg-orange-900 bg-opacity-10 w-screen h-screen fixed top-0 flex justify-center items-center">
			<div className="flex flex-col bg-white px-10 py-6 rounded-lg">
				{error !== "" && (
					<div className="text-white text-base bg-red-400 p-2">
						{error}
					</div>
				)}
				<div className="row-span-3 col-span-1 flex items-center justify-center gap-10">
					<div className="flex flex-col items-center relative w-3/5">
						<ImageUploading
							value={images}
							onChange={onChange}
							dataURLKey="data_url">
							{({
								imageList,
								onImageUpload,
								onImageRemoveAll,
								onImageUpdate,
								onImageRemove,
								isDragging,
								dragProps,
							}) => (
								// write your building UI
								<div className="flex flex-col items-center relative">
									<button
										onClick={() => {
											onImageUpload();
										}}
										className="bg-[#202b47] text-white p-1 rounded-full max-w-fit lg:text-lg absolute -bottom-2 z-10">
										<MdEdit />
									</button>
									&nbsp;
									{images.map((image, index) => (
										<div key={index} className="image-item">
											<button
												className=" text-black rounded-full lg:text-xl p-1 font-bold absolute top-0 right-0"
												onClick={() =>
													onImageRemove(index)
												}>
												<MdCancel />
											</button>
											<div className="flex rounded-[50%] overflow-hidden relative w-32 h-32 justify-center">
												<img
													src={image["data_url"]}
													alt=""
													className="w-auto h-44"
												/>
											</div>
											<div className="image-item__btn-wrapper flex justify-between items-center relative">
												{/* <button
													className="bg-green-600 text-white rounded-full lg:text-lg p-1 font-bold absolute -bottom-2 right-0"
													onClick={() =>
														onImageUpdate(index)
													}>
													<MdCheck />
												</button> */}
											</div>
										</div>
									))}
								</div>
							)}
						</ImageUploading>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="firstname"
							className="mt-4 mb-2 font-medium text-base text-slate-600">
							First Name
						</label>
						<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between lg:w-[40rem]">
							<input
								type="text"
								id="firstname"
								className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
								placeholder="First Name"
								defaultValue={currentUser.name.split(" ")[0]}
								ref={firstName}
							/>
						</div>
						<label
							htmlFor="lastname"
							className="mt-4 mb-2 font-medium text-base text-slate-600">
							Last Name
						</label>
						<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between">
							<input
								type="text"
								id="lastname"
								className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
								placeholder="Last Name"
								value={currentUser.name.split(" ")[1]}
								ref={lastName}
							/>
						</div>
						<label
							htmlFor="email"
							className="mt-4 mb-2 font-medium text-base text-slate-600">
							Email
						</label>
						<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between">
							<input
								type="email"
								id="email"
								className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
								placeholder="Confirm Password"
								value={currentUser.email}
								disabled
							/>
						</div>
						<label
							htmlFor="number"
							className="mt-4 mb-2 font-medium text-base text-slate-600">
							Mobile Number
						</label>
						<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between">
							<input
								type="text"
								id="number"
								className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
								placeholder="Mobile Number"
								defaultValue={currentUser.number || ""}
								ref={number}
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
			</div>
		</div>
	);
}
