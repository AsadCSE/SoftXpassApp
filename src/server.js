const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apiRouter = require('./routers/api/apiRouter')
const errorRouter = require('./routers/error/error')
/* db connection */ require('./db/db-con')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/api', apiRouter)
app.use('*', errorRouter)

const port = process.env.PORT || 2000
app.listen(port, () => {
    console.log(`server started at port: ${port}...`)
})