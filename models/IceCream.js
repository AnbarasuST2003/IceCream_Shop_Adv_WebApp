"use strict";

var Sequelize = require("sequelize");
const sequelize = new Sequelize('postgres://postgres:Becomeias46@@localhost:5432/iceshopadvweb');

module.exports = function (sequelize, DataTypes) {
	let IceCream = sequelize.define("IceCream", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	});

	return IceCream;
};
