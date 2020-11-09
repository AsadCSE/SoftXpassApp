const mongoose = require('mongoose')

mongoose.connect(process.env.DBURL, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},(error,result) => {
    if(error){
        return console.log(error)
    }
    console.log('db connection success')
})
