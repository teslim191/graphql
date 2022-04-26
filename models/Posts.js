const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
    
})

module.exports = mongoose.model('Posts', PostSchema)