require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

const routes = require("./controllers")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
