const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("./../../schemas/users");
const bcrypt = require("bcryptjs");
const protected = require("../../middleware/protect");

//@name     POST API to /api/auth
//@desc     Access login for all users [writers and customers]
//@acess    Public
router.post("/", (req, res) => {
	const { email, password, role } = req.body;

	//validation of fields

	if (!email || !password || !role) {
		return res.status(400).json({
			text: "Please Provide both an email and a password",
		});
	}

	//check if user exists
	users.findOne({ email }).then((user) => {
		if (user) {
			//Compare password matching
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (!isMatch)
					return res.status(400).json({
						text: `Invalid Credentials for user with email: ${email}`,
					});

				//if passwords do match, return the user without the password
				jwt.sign({ id: user._id }, process.env.privateKey, (err, token) => {
					if (err) {
						res
							.status(200)
							.json({ text: "An Error Occured while hashing passwords" });
						return;
					}

					res.json({
						token,
						user: {
							id: user._id,
							email: user.email,
							name: user.name,
							role: user.role,
							status: user.status,
						},
					});
				});
			});
		} else {
			return res
				.status(400)
				.json({ text: `The User with the email ${email} does not exist` });
		}
	});
});

//@name     POST API to /api/auth/register
//@desc     Access registration for users [customers and writers]
//@acess    Public
router.post("/register", (req, res) => {
	const { name, email, password, role } = req.body;

	//validation of fields

	if (!name || !email || !password || !role) {
		return res.status(400).json({
			text: "Please Provide all fields",
		});
	}

	//check if user exists
	users.findOne({ email }).then((user) => {
		if (!user) {
			bcrypt.genSalt(10, (err, salt) => {
				if (err) throw err;
				bcrypt.hash(password, salt).then((newPass) => {
					const newUser = {
						name,
						email,
						password: newPass,
						role,
						status: "active",
					};

					users
						.create(newUser)
						.then((user) => {
							jwt.sign(
								{ id: user._id },
								process.env.privateKey,
								(err, token) => {
									if (err) {
										res.status(200).json({
											text: "An Error Occured while hashing passwords",
										});
										return;
									}

									res.json({
										token,
										user: {
											id: user._id,
											email: user.email,
											name: user.name,
											role: user.role,
											status: user.status,
										},
									});
								},
							);
						})
						.catch((err) => console.log(err));
				});
			});
		} else {
			return res
				.status(400)
				.json({ text: `A User with the email ${email} exists` });
		}
	});
});

//@name     GET API to /api/auth/user
//@desc     Get user data
//@acess    Private
router.get("/user", protected, (req, res) => {
	const user = users
		.findById(req.user.id)
		.select("-password")
		.then((user) => res.json(user));

	if (!user) {
		return res.status(400).json({ text: "No User Found" });
	}
	return user;
});

module.exports = router;
