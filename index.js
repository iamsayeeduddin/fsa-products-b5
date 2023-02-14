const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const homeRoute = require("./routes/homeRoute")
const config = require("./config/")

mongoose.set('strictQuery', false)

const app = express()

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}!`))

mongoose.connect(config.dbConStr, (err, result) => {
    if(!err){
        console.log("DB Connected!")
    } else {
        console.log(err)
    }
})

app.use('/', homeRoute)
app.use(bodyParser.json)