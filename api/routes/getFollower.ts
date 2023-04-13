import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getFollowerRouter = express.Router();
getFollowerRouter.get("/", function (req, res) {
	res.send("Hello from getFollowerRouter");
});
getFollowerRouter.post("/", async function (req, res, next) {
	console.log(req.body.id);
	const userFollowers = await prisma.user.findUnique({
		where: { id: req.body.id },
		include: {
			followedBy: {
				select: {
					id: true,
					name: true,
					picture: true,
					current_work: true,
					_count: {
						select: {
							followedBy: true,
						},
					},
				},
			},
		},
	});
	res.status(200).send(userFollowers?.followedBy);
});
