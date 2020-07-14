const mongoose = require('mongoose')

const musicSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    image: String,
    url: String
})

const bandSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    image: String,
    musics: [musicSchema]
})

module.exports = mongoose.model('Band', bandSchema)