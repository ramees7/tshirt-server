const orders = require('../Models/orderSchema')

exports.addToOrders = async (req, res) => {
    try {
        console.log("Inside Add Order")
        const userId = req.payload
        const { products, username, phone, orderNo, address, pincode, totalOrderPrice, date, deliveryDate, statusOrdered, statusPlaced, statusShipped, statusDelivered } = req.body
        console.log(products, username, phone, orderNo, address, pincode, date, totalOrderPrice, deliveryDate, statusOrdered, statusPlaced, statusShipped, statusDelivered)
        const newOrder = new orders({ userId, products, username, phone, orderNo, address, pincode, totalOrderPrice, date, deliveryDate, statusOrdered, statusPlaced, statusShipped, statusDelivered })
        res.status(200).json(newOrder)
        await newOrder.save()
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.getOrdersList = async (req, res) => {
    try {
        console.log("Inside get Orders")
        userId = req.payload
        const result = await orders.find({ userId })
        res.status(200).json(result)
        console.log(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.getOrdersListAdmin = async (req, res) => {
    try {
        console.log("Inside get Orders")
        const result = await orders.find()
        res.status(200).json(result)
        console.log(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        console.log("inside delete order")
        const { id } = req.params
        const result = await orders.deleteOne({ _id: id })
        res.status(200).json(result)
        console.log(res);
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

exports.updateShipping = async (req, res) => {
    try {
        console.log("Inside update shipping")
        const {id} =req.params 
        const { userId,products, username, phone, orderNo, address, pincode, totalOrderPrice, date, deliveryDate, statusOrdered, statusPlaced, statusShipped, statusDelivered } = req.body
        console.log(userId,products, username, phone, orderNo, address, pincode, date, totalOrderPrice, deliveryDate, statusOrdered, statusPlaced, statusShipped, statusDelivered)
        const result = await orders.updateOne({_id:id},{ userId, products, username, phone, orderNo, address, pincode, totalOrderPrice, date, deliveryDate, statusOrdered, statusPlaced, statusShipped, statusDelivered })
        res.status(200).json(result)
        console.log(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}