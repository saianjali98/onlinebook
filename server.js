var express = require('express')
var mongo = require('mongodb').MongoClient
var app = express()
var cors = require('cors')
var database;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongo.connect("mongodb://localhost:27017/", (err, data) => {
    if (err) {
        console.log(
            "Can't connect to the database"
        )
    }
    else {
        console.log("Connected successfully to Mongo")
    }
    database = data.db('onlinebook', (err) => {
        if (!err)
            console.log("connected to onlinebook")
        else
            console.log("cant connect to onlinebook")
    })
})

app.get("/data", (req, res) => {
    database.collection('cartdetails').find({}).toArray((err, result) => {
        if (err) {
            console.log("error" + err)
        }
        else {
            console.log(result)
            res.json(result)
        }
    }

    )



})



app.listen(8007, (err) => {
    if (!err)
        console.log("Server connected at Port 8007")
    else
        console.log("Couln't load the server" + err)
})