const mongoose = require('mongoose')
const url = process.env.DBURL
mongoose.connect(url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},(error,result) => {
    if(error){
        return console.log(error)
    }
    console.log('db connection success')
})
