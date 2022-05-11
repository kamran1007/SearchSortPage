const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const mangoose = require('mongoose')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const data = await User.find()
        res.json(data)

    } catch (err) {
        res.send('Error' + err)
    }
})
router.post('/', async (req, res) => {
    
    const user = await new User({
        _id: new mangoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    })
    try {
        const a1 = await user.save()
        res.json(a1)
    } catch (err) {
        res.send('Error' + err)
    }
    console.log(user)
    

})
//search for a name
router.get("/search/:name", function (req, res) {
    var regex = new RegExp(req.params.name, 'i');
    User.find({ name: regex }).then((result) => {
        res.status(200).json(result)
    })
    console.log(regex)
})

//sort for age(assending order)
router.get('/agesort/assec', async (req, res) => {
    try {
        const data = await User.find()
        .sort({age: 1})
        // .sort({age:-1})
        res.json(data)
        console.log(data)

        

    } catch (err) {
        res.send('Error' + err)
    }
    
})
//sort for age(dessending order)
router.get('/agesort/dssec', async (req, res) => {
    try {
        const data = await User.find()
            .sort({ age: -1 })
        // .sort({age:-1})
        res.json(data)
        console.log(data)



    } catch (err) {
        res.send('Error' + err)
    }

})
///pagination
router.post('/pagination', async (req, res) => {
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize; 

    const skip = pageSize * (currentPage -1);
    const limit = pageSize;

    (await User.find({}).skip(skip).limit(limit).exec((err, docs)=>{
        if(err){
            responseObj = {
                "status": "error",
                "msg" :"Input is missing",
                "body" : {}
            }
            res.status(500).send(responseObj);

        }else{
            responseObj = {
                "status" : "success",
                "msg" : "record found",
                "body" : docs
            }
            res.status(200).send(responseObj);
        }
    }))
})

module.exports = router