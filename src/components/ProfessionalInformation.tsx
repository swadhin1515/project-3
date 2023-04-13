import React, { useContext, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Context } from "../Context";
const Educations = [
	"Primary",
	"Secondary",
	"Higher Secondary",
	"Graduation",
	"Post Graduation",
];
const Works = [
	"Schooling",
	"College Student",
	"Teaching",
	"Job",
	"Freelancing",
];
export function ProfessionalInformation() {
	const { currentUser, performFetch } = useContext(Context);
	const [educationBrowseModalVisible, setEducationBrowseModalVisible] =
		useState(false);
	const [workBrowseModalVisible, setWorkBrowseModalVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [highestEducation, setHighestEducation] = useState(
		currentUser.highest_education || "Graduation"
	);
	const [currentWork, setCurrentWork] = useState(
		currentUser.current_work || "College Student"
	);
	async function handleSave() {
		setEducationBrowseModalVisible(false);
		setWorkBrowseModalVisible(false);
		try {
			const formData = {
				email: currentUser.email,
				current_work: currentWork,
				highest_education: highestEducation,
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
				<h1 className="font-bold text-base">
					PROFESSIONAL INFORMATION
				</h1>
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
			<div className="grid grid-cols-2 gap-10">
				<div>
					<h2 className="text-base font-medium mb-2 text-gray-600">
						Highest Education
					</h2>
					<div className="text-base text-gray-600  rounded-lg items-center bg-white flex">
						<div className="relative w-full">
							<button
								disabled={!isEditing}
								className="p-3 flex items-center w-full justify-between"
								onClick={() =>
									setEducationBrowseModalVisible(
										(prev) => !prev
									)
								}>
								<span className="text-base font-medium ">
									{highestEducation}
								</span>
								{educationBrowseModalVisible ? (
									<RiArrowDropUpLine className="text-lg" />
								) : (
									<RiArrowDropDownLine className="text-lg" />
								)}
							</button>
							<div
								className={
									`flex flex-col z-20 pb-2 shadow-lg w-full rounded-lg bg-white absolute top-12 transition duration-200 overflow-hidden ` +
									`${
										educationBrowseModalVisible
											? `opacity-100 `
											: `opacity-0 h-0`
									}`
								}>
								{Educations.map(
									(education: string, index: number) => {
										return (
											<span
												onClick={() => {
													setHighestEducation(
														education
													);
													setEducationBrowseModalVisible(
														(prev) => !prev
													);
												}}
												key={index}
												className={`${
													highestEducation ===
														education &&
													"bg-orange-400 text-white "
												} + cursor-pointer hover:bg-orange-100 py-1 px-6 transition duration-200 text-base rounded`}>
												{education}
											</span>
										);
									}
								)}
							</div>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-base font-medium mb-2 text-gray-600">
						What do you do currently?
					</h2>
					<div className="text-base  text-gray-600 rounded-lg items-center bg-white flex">
						<div className="relative w-full">
							<button
								disabled={!isEditing}
								className="p-3 flex items-center justify-between w-full"
								onClick={() =>
									setWorkBrowseModalVisible((prev) => !prev)
								}>
								<div className="text-base font-medium">
									{currentWork}
								</div>
								{workBrowseModalVisible ? (
									<RiArrowDropUpLine className="text-lg " />
								) : (
									<RiArrowDropDownLine className="text-lg" />
								)}
							</button>
							<div
								className={
									`flex flex-col z-20 pb-2 p-1 shadow-lg w-full rounded-lg bg-white absolute top-12 transition duration-200 overflow-hidden ` +
									`${
										workBrowseModalVisible
											? `opacity-100`
											: `opacity-0 h-0`
									}`
								}>
								{Works.map((work: string, index: number) => {
									return (
										<span
											onClick={() => {
												setCurrentWork(work);
												setWorkBrowseModalVisible(
													(prev) => !prev
												);
											}}
											key={index}
											className={`${
												currentWork === work &&
												"bg-orange-400 text-white"
											} + cursor-pointer hover:bg-orange-100 py-1 px-6 transition duration-200 text-base rounded`}>
											{work}
										</span>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
