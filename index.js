const express = require("express");
require("dotenv").config();
const app = express();
const mongose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
//body parser midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connecting to mongose database
mongose
	.connect(process.env.dbUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database connnection successful!"))
	.catch((err) => console.log(err));

//auth API Endpoint
app.use("/api/auth", require("./routes/api/auth"));

//Admin API Endpoint
app.use("/api/admin", require("./routes/api/admin"));

//Customers API Endpoint
app.use("/api/customers", require("./routes/api/customers"));

//Writers API Endpoint
app.use("/api/writers", require("./routes/api/writers"));

//handle production
if (process.env.NODE_ENV == "production") {
	//set static folder
	app.use(express.static(__dirname + "/dist"));

	//handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + "/dist/index.html"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
