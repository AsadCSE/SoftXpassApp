const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const deleteUser = new express.Router()

deleteUser.delete('/', (req, res) => {
    if(req.headers.bearer){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send()}
            try {
                const user = await User.findOne({ _id: data.data })
                if(!user){return res.status(404).send()}
                const deletedUser = await User.deleteOne({_id: user._id})
                if(!deletedUser){return res.status(500).send()}
                res.send()
            }catch(e) {
                res.status(500).send()
            }
        })
    }
    res.status(400).send()
})

module.exports = deleteUser