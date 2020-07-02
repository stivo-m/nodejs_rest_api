const express = require("express");
const router = express.Router();
const orders = require("../../schemas/orders");
const protected = require("../../middleware/protect");
const stripe = require("stripe")(process.env.stripePrivateKey);

//@name     GET API to /api/customers/orders
//@desc     gives all the orders [progress, completed, approved, disputed]
//@acess    private
router.get("/orders", protected, (req, res) => {
	orders.find({ customer: req.user.id }, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     POST API to /api/customers/orders
//@desc     creates new order
//@acess    private
router.post("/orders", protected, (req, res) => {
	const {
		title,
		pages,
		sources,
		instructions,
		deadline,
		cost,
		spacing,
		type,
		topic,
	} = req.body;

	//TODO: add customer id from JWT token
	const newOrder = {
		title,
		topic,
		pages,
		sources,
		instructions,
		deadline,
		spacing,
		cost,
		type,
		sku: "",
		status: "pending",
		customer: req.user.id,
		writer: "0",
		tnx_id: "0",
		tnx_type: "0",
		amount_paid: "0",
		pay_status: "not paid",
	};

	//validate that all fields are given
	if (!newOrder.title) {
		res.status(400).json({ text: "One or More fields are empty" });
	} else {
		//save order to Database
		orders
			.create(newOrder)
			.then((data) => {
				res.json({ data });
				console.log(data);
			})
			.catch((err) => {
				res.status(400).json({ text: `Error: ${err.message}` });
			});
	}
});

//@name     POST API to /api/customers/stripe
//@desc     pays an already existing order
//@acess    private
router.post("/stripe", protected, (req, res) => {
	orders.find({ _id: req.body.description }, {}, (err, order) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });

		stripe.charges.create(
			{
				amount: Math.round(parseInt(order[0].cost * 100)),
				currency: "usd",
				source: req.body.source,
				description: order.title,
			},

			function (err, charge) {
				if (err) {
					//console.log(err);
					return res.status(400).json({ text: err });
				}
				//save charge status to db on the  order

				order.pay_status = charge.status;
				order.amount_paid = charge.amount;
				order.tnx_id = charge.id;
				order.tnx_type = charge.payment_method_details.type;

				orders.updateOne(
					{ _id: req.body.description },
					{
						$set: {
							pay_status: charge.status,
							amount_paid: charge.amount / 100,
							tnx_id: charge.id,
							tnx_type: charge.payment_method_details.type,
						},
					},
					{ upsert: true },
					(err, ord) => {
						if (err) return res.status(400).json(err);

						if (ord.nModified === 1)
							return res.status(200).json({
								text: "Successfully Paid",
								pay_status: "success",
								order: req.body.description,
							});
					},
				);
				//res.json(data);
			},
		);
	});
});

//@name     GET API to /api/customers/orders/pending
//@desc     gives all the orders in [pending]
//@acess    private
router.get("/orders/progress", protected, (req, res) => {
	orders.find({ status: "available" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     GET API to /api/customers/orders/progress
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

//@name     GET API to /api/customers/orders/completed
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

//@name     GET API to /api/customers/orders/approved
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

//@name     GET API to /api/customers/orders/disputed
//@desc     gives all the orders in [disputed]
//@acess    private
router.get("/orders/dispuited", protected, (req, res) => {
	orders.find({ status: "disputed" }, {}, (err, data) => {
		if (err)
			return res
				.status(400)
				.json({ text: "Could Not Find Your Requested Data" });
		res.json(data);
	});
});

//@name     PUT API to /api/customers/orders/id
//@desc     Updates order details
//@acess    private
router.put("/orders/:id", protected, (req, res) => {
	orders.findByIdAndUpdate(
		{ id: req.params.id },
		{
			$set: {},
		},

		{ upsert: true },

		(err, data) => {
			if (err) return res.status(400).json(err);
			res.json(data);
		},
	);
});

//@name     GET API to /api/customers/orders/id
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

//@name     DELETE API to /api/customers/orders/id
//@desc     Deletes order details
//@acess    private
router.delete("/orders/:id", protected, (req, res) => {
	orders.findByIdAndDelete(req.params.id, {}, (err, data) => {
		if (err)
			return res.status(400).json({ text: "Could Not delete order", err });
		res.json(data);
	});
});

module.exports = router;
