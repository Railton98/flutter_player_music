const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const BandModel = require('../models/band_model')

// get all bands registered
router.get('/', async function (req, res) {
    try {
        const bands = await BandModel
            .find({}, { _id: 1, name: 1, image: 1, category: 1 })
            .exec()

        res.json(bands)
    } catch (error) {
        console.error(error)
        res.status(500).send({ 'message': 'Error at get Bands' })
    }
})

// register a new band
router.post('/', async function (req, res) {
    try {
        const bandModel = new BandModel({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            musics: []
        })

        await bandModel.save()
        res.status(200).send()
    } catch (error) {
        console.error(error)
        res.status(500).send({ 'message': 'Error at Band Register' })
    }
})

// update band | add music to band
router.put('/:id/music', async function (req, res) {
    try {
        const bandUpdated = BandModel.findByIdAndUpdate(req.params['id'], {
            $push: {
                musics: {
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    image: req.body.image,
                    url: req.body.url
                }
            }
        })

        await bandUpdated.exec()
        res.send({ 'message': 'Music added successfully!' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ 'message': 'Error at Music Register' })
    }
})

// get a band
router.get('/:id', function (req, res) {
    BandModel
        .findById(req.params['id'])
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.error(err)
            res.status(500).send({ 'message': 'Error at  search band' })
        })
})

// get a music
router.get('/music/:id', async function (req, res) {
    try {
        const docBand = await BandModel
            .findOne({ 'musics._id': req.params['id'] }, { 'musics.$': 1 })

        if (docBand && docBand.musics) {
            res.json(docBand.musics[0])
        } else {
            res.json({})
        }
    } catch (error) {
        console.error(error)
        res.json({})
    }
})

// delete a band
router.delete('/:id', async function (req, res) {
    try {
        await BandModel.findByIdAndRemove(req.params['id']).exec()
        res.send()
    } catch (error) {
        res.status(500).send({ 'message': 'Error at delete this band' })
    }
})

// delete a music
router.delete('/:id/music/:music', function (req, res) {
    BandModel.findByIdAndUpdate(req.params['id'], {
        $pull: {
            musics: {
                _id: req.params['music']
            }
        }
    })
        .exec()
        .then((_) => res.send())
        .catch((err) => {
            console.error(err)
            res.status(500).send({ 'message': 'Error at delete music' })
        })
})

module.exports = router
