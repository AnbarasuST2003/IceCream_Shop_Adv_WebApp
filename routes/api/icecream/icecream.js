var models = require('../../../models');

exports.get = async function (req, res) {
	try {
		const iceCream = await models.IceCream.findAll();

		if (iceCream) {
			res.send({success: false, error: 'Icecream not found'})
		}
		return res.send({ success: true, results: iceCream }); // Send iceCream as response
	} catch (error) {
		console.error('Error fetching iceCream:', error);
		return res.send({ success: false, message: 'Error in fetching FuelRequest.' });
	}
};