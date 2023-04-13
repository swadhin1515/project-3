import jwt from "jsonwebtoken";
import express from "express";
import { prisma, app } from "../app";
import bcrypt from "bcrypt";
export const loginRouter = express.Router();
loginRouter.get("/", function (req, res) {
	res.status(200).send("Hello from login server");
});
loginRouter.post("/", async (req, res) => {
	const user = await prisma.user
		.findUnique({
			where: {
				email: req.body.email,
			},
		})
		.then((user) => {
			bcrypt
				.compare(req.body.password, user!.password)
				.then((passwordCheck) => {
					if (!passwordCheck) {
						return res.status(400).send({
							message: "Wrong Email or Password",
						});
					}

					//   create JWT token
					const token = jwt.sign(
						{
							userId: user!.id,
							userEmail: user!.email,
						},
						"RANDOM-TOKEN",
						{ expiresIn: "24h" }
					);

					//   return success res
					res.status(200).send({
						message: "Login Successful",
						user: user,
						token,
					});
				})
				.catch((err) => {
					res.status(400).send({
						message: "Wrong Email or Password",
						err,
					});
				});
			return user;
		})
		.catch((err) => {
			res.status(404).send({
				message: "Wrong Email or Password",
				err: err,
			});
		});
	return user;
});
