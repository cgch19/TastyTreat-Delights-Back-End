require("dotenv").config()

const { PORT } = process.env
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require('mongoose');


const routes = require("./controllers")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
} )


