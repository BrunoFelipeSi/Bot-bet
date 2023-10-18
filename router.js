const express = require("express")
const Router = express.Router()

Router.get("/", (req, res)=>{
    aGetData.run()
})

module.exports = Router