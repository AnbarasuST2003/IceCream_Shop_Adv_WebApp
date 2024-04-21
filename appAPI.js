const express = require("express");
const app = express();
let cors = require('cors')

app.use(cors());

app.use('/api/icecream', require('./routes/api/icecream'))

app.use('/*', function (req, res, next) {
	res.send({ success: false, error: 'API not exist' });
});

app.listen(8080, () => {
	console.log("server started at port 8080");
});