import express from "express";
import bcrypt from "bcrypt";

import { prisma, app } from "../app";
export const updateRouter = express.Router();
updateRouter.get("/", function (req, res) {
	res.send("Hello from update");
});
updateRouter.post("/", async (req, res) => {
	console.log(req.body);
	if (req.body.oldPassword) {
		await bcrypt
			.compare(req.body.oldPassword, req.body.currentPassword)
			.then(async (passwordCheck) => {
				console.log(passwordCheck);
				if (passwordCheck) {
					await bcrypt
						.hash(req.body.password, 10)
						.then((password) => {
							prisma.user.update({
								where: {
									email: req.body.email,
								},
								data: {
									password: password,
								},
							});
						});
				} else {
					res.status(400).send({
						message: "Wrong Email or Password",
					});
				}
			});
	}
	prisma.user
		.update({
			where: {
				email: req.body.email,
			},
			data: {
				picture: req.body.picture || undefined,
				name: req.body.name || undefined,
				number: req.body.number || undefined,
				about: req.body.about || undefined,
				interests: req.body.interests || undefined,
				linkedin: req.body.linkedin || undefined,
				instagram: req.body.instagram || undefined,
				github: req.body.github || undefined,
				facebook: req.body.facebook || undefined,
				website: req.body.website || undefined,
				twitter: req.body.twitter || undefined,
				highest_education: req.body.highest_education || undefined,
				current_work: req.body.current_work || undefined,
				following: {
					connect: req.body.following || undefined,
				},
			},
		})
		.then((user) => {
			//   return success res
			res.status(200).send({
				message: "Update Successful",
				user,
			});
		})
		.catch((err) => {
			res.status(400).send({
				message: "Not Authorized or email not found",
				err,
			});
		});
});
