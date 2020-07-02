const express = require("express");
const router = express.Router();
const orders = require("../../schemas/orders");

//@name     GET API to /api/writers/orders
//@desc     gives all the orders [progress, completed, approved, disputed]
//@acess    private
router.get("/orders", (req, res) => {
	orders.find({}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/writers/orders/progress
//@desc     gives all the orders in [progress]
//@acess    private
router.get("/orders/progress", (req, res) => {
	orders.find({ status: "progress" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/writerss/orders/completed
//@desc     gives all the orders in [completed]
//@acess    private
router.get("/orders/completed", (req, res) => {
	orders.find({ status: "completed" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/writerss/orders/approved
//@desc     gives all the orders in [approved]
//@acess    private
router.get("/orders/approved", (req, res) => {
	orders.find({ status: "approved" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/writerss/orders/disputed
//@desc     gives all the orders in [disputed]
//@acess    private
router.get("/orders/disputed", (req, res) => {
	orders.find({ status: "disputed" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     PUT API to /api/writerss/orders/id
//@desc     Updates order details
//@acess    private
router.put("/orders/:id", (req, res) => {
	res.send(`updates details of order ${req.params.id}`);
});

//@name     GET API to /api/writers/orders/id
//@desc     obtaines order details
//@acess    private
router.get("/orders/:id", (req, res) => {
	orders.findById(req.params.id, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested order" });
		res.json(data);
	});
});

module.exports = router;
