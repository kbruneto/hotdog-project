const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const port = 3001
const app = express();
app.use(express.json());
app.use(cors());

    const orders = []

    const checkIdOrders = (req, res, next) => {
        const {id} = req.params

        const index = orders.findIndex(order => order.id === id)

        if(index < 0){
            return res.status(404).json({error: "Order not found"})
        }

        req.orderIndex = index
        req.orderId = id

        next()
    }

app.get('/orders', (req, res) => {
    res.json(orders)
})

app.post('/orders', (req, res) => {
    const {order, name} = req.body

    const newOrder = { id: uuid.v4(), order, name}

    orders.push(newOrder)

    return res.status(201).json(newOrder)
})

app.delete('/orders/:id', checkIdOrders, (req, res) => {
    const index = req.orderIndex
    const id = req.orderId

    orders.splice(index,1)

    return res.status(204).json()
})

app.listen(port, () => {
    console.log(`Server has been Started on port ${port}`)
});
