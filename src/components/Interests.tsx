import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Context } from "../Context";
const InterestsArray = [
	"App Development",
	"Web Development",
	"Game Development",
	"Data Structures",
	"Programming",
	"Machine Learning",
	"Data Science",
	"Others",
];
export function Interests() {
	const [showModal, setShowModal] = useState(false);
	const { currentUser } = useContext(Context);
	const [selectedInterests, setSelectedInterests] = useState(
		currentUser.interests || []
	);
	return (
		<>
			<section className="border-b-2 pb-10 mt-10 mx-4 lg:ml-40 lg:mx-10">
				<header className="flex justify-between items-center mb-4 ">
					<h1 className="font-bold text-base">INTERESTS</h1>
					<button
						onClick={() => setShowModal((prev) => !prev)}
						className=" py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200
                                "
						disabled={showModal}>
						Edit
					</button>
				</header>
				<div className="flex flex-wrap gap-4">
					{selectedInterests.map((interest: string) => {
						return (
							<span
								key={interest}
								className="rounded-lg bg-orange-100 bg-opacity-70 text-orange-400 p-2 px-4 text-xs">
								{interest}
							</span>
						);
					})}
				</div>
			</section>
			{showModal && (
				<InterestsAddModal
					setShowModal={setShowModal}
					selectedInterests={selectedInterests}
					setSelectedInterests={setSelectedInterests}
				/>
			)}
		</>
	);
}
function InterestsAddModal(props: any) {
	const { currentUser, performFetch } = useContext(Context);
	async function handleSave() {
		props.setShowModal(false);
		try {
			const formData = {
				email: currentUser.email,
				interests: props.selectedInterests,
			};
			await performFetch({ url: "update", formData });
		} catch (err) {
			console.error(err);
		}
	}
	function handleInterestSelection(e, interest: string) {
		e.preventDefault();
		props.setSelectedInterests((prev: string[]) => {
			if (prev.includes(interest)) {
				return prev.filter((value: string) => value !== interest);
			} else return [...prev, interest];
		});
	}
	return (
		<div className="z-30  bg-orange-900 bg-opacity-10 w-screen h-screen fixed top-0 flex justify-center items-center">
			<div className="flex flex-col bg-white p-6 pb-14 rounded-lg">
				<button
					className="text-base place-self-end mb-5 hover:bg-slate-100 rounded-full p-3"
					onClick={handleSave}>
					<AiOutlineClose />
				</button>
				<div className="grid grid-cols-2 gap-4 p-2">
					{InterestsArray.map((interest) => {
						return (
							<button
								key={interest}
								onClick={(e) =>
									handleInterestSelection(e, interest)
								}
								className={`${
									props.selectedInterests.includes(interest)
										? "bg-orange-400 text-white hover:bg-orange-300"
										: "bg-slate-100 text-slate-700 hover:bg-gray-100"
								} + text-xs rounded-lg p-3  font-medium`}>
								{interest}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
