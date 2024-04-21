const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.send({ success: false, error: "Please Enter Your Email and Password"});
		}

		db.query("select * from users where email=?",
			[email], async (error, result) => {
				console.log(result);
				if (result.length <= 0) {
					return res.status(401).render('login', {
						msg: "Email or Password Incorrect...",
						msg_type: "error",
					});
				} else {
					if (!(await bcrypt.compare(password, result[0].PASS))) {
						return res.status(401).render('login', {
							msg: "Email or Password Incorrect...",
							msg_type: "error",
						});
					} else {
						const id = result[0].ID;
						const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
							expiresIn: process.env.JWT_EXPIRES_IN,
						});
						console.log("The token is" + token);
						const cookieOptions = {
							expires: new Date(
								Date.now() +
								process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
							),
							httpOnly: true,
						};
						res.cookie("freshices", token, cookieOptions);
						res.status(200).redirect("/home")
					}
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};