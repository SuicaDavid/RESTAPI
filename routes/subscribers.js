const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.get('/', async (req, res) => {
    console.log('get')
    try {
        const subscriber = await Subscriber.find()
        res.json(subscriber)
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
})

router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber.name)
})

router.post('/', async (req, res) => {
    console.log('post')
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.json(201).json(newSubscriber)
    } catch(errir) {
        res.status(400).json({ message: error.message})
    }
})
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name !== null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel !== null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'Deleted Subscriber'})
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber === null) {
            return res.status(404).json({ message: "Cannot find subscriber"})
        }
    } catch(error) {
        res.status(500).json({ message: error.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router