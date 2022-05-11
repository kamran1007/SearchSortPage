const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // created_date: { type: Date, default: Date.now() }
    
       
    
})
module.exports = mongoose.model('User', userSchema)