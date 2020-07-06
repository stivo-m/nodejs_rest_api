const express = require("express");
const router = express.Router();
const orders = require("../../schemas/orders");
const protected = require("../../middleware/protect");
const users = require("./../../schemas/users");

//@name     GET API to /api/admin/orders
//@desc     gives all the orders [progress, completed, approved, disputed]
//@acess    private
router.get("/orders", protected, (req, res) => {
	orders.find({}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/admin/orders/progress
//@desc     gives all the orders in [progress]
//@acess    private
router.get("/orders/progress", protected, (req, res) => {
	orders.find({ status: "progress" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/admins/orders/completed
//@desc     gives all the orders in [completed]
//@acess    private
router.get("/orders/completed", protected, (req, res) => {
	orders.find({ status: "completed" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/admins/orders/approved
//@desc     gives all the orders in [approved]
//@acess    private
router.get("/orders/approved", protected, (req, res) => {
	orders.find({ status: "approved" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/admins/orders/disputed
//@desc     gives all the orders in [disputed]
//@acess    private
router.get("/orders/disputed", protected, (req, res) => {
	orders.find({ status: "disputed" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     PUT API to /api/admins/orders/id
//@desc     Updates order details
//@acess    private
router.put("/orders/:id", protected, (req, res) => {
	res.send(`updates details of order ${req.params.id}`);
});

//@name     GET API to /api/admin/orders/id
//@desc     obtaines order details
//@acess    private
router.get("/orders/:id", protected, (req, res) => {
	orders.findById(req.params.id, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested order" });
		res.json(data);
	});
});

//@name     GET API to /api/admin/customers
//@desc     obtaines list of all customers
//@acess    private
router.get("/customers", protected, (req, res) => {
	users.find({ role: "customer" }, (err, data) => {
		if (err) {
			console.error(err);
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested data" });
		}
		res.json(data);
	});
});

module.exports = router;
