const mongose = require("mongoose");

const orderSchema = new mongose.Schema({
	title: {
		type: String,
		required: true,
	},
	customer: {
		type: String,
		required: true,
	},
	writer: {
		type: String,
		default: 0,
	},
	instructions: {
		type: String,
		required: true,
	},
	pages: {
		type: String,
		required: true,
	},
	sources: {
		type: String,
		required: true,
	},
	deadline: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	cost: {
		type: String,
		required: true,
	},
	type: {
		type: String,
	},
	spacing: {
		type: String,
	},

	sku: {
		type: String,
		default: null,
	},

	pay_status: {
		type: String,
		default: null,
	},
	amount_paid: {
		type: String,
		default: null,
	},
	tnx_id: {
		type: String,
		default: null,
	},
	tnx_type: {
		type: String,
		default: null,
	},
});

module.exports = mongose.model("orders", orderSchema);
