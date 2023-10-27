const executaColeta = require('./arbetyGetData.js')
const express = require("express")
const app = express()
var cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`)
})

app.get('/read', async (req, res) => {
    try{
        res.send(executaColeta.pushArrayItens())
    }catch(error){
        res.send(error)
    }
})

executaColeta.run()