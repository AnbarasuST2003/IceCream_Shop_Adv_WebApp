const express = require("express");
const app = express();
const path = require("path")
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const { config } = require("dotenv");
const cors = require('cors');



require("dotenv"), config()

app.use(bodyParser.json());

app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

//for styling connection
const location = path.join(__dirname, "./public");
app.use(express.static(location))
app.set("view engine", "hbs")

//for partials
const partialspath = path.join(__dirname, "views", "partials")
hbs.registerPartials(partialspath)

//for other js file connection
app.use("/", require("./routes/index"))
app.use("/authen", require("./routes/authen"))
app.use("/", require("./routes/product"))


app.listen(5000, () => {
	console.log("server started at port 5000");
});