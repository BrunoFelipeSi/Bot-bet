const express = require("express")
const bodyParser = require("body-parser")
const aGetData = require("./arbetyGetData.js")

const app = express()
const port = 3000

const Urlpth = require("./router")

app.use(bodyParser.json())

app.use("/", Urlpth)

app.listen(port, ()=>console.log("Server running on port 3000"))