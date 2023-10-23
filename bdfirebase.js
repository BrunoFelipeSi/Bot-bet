//CONEXÃO E FUNÇÕES COM O BD FIREBASE
const express = require("express")
const app = express()

const admin = require("firebase-admin")
const credentials = require("./Key.json")

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const db=admin.firestore()

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`)
})

const checkLastId = async () => {
    const snapshot = await db.collection('betbot').get();
    const listIDs = snapshot.docs.map(doc => doc.id);
    let nextID = (Math.max(...listIDs) + 1).toString()
    return nextID
}

async function addLastItem (itens) {
    try{
        let id = await checkLastId()
        const rodadaJson = {
            cor: (itens[19] == 0) ? 'Branco' : (itens[19] < 8) ? 'Vermelho' : 'Verde',
            horario: new Date(),
            numero: itens[19]
        }
        console.log(rodadaJson)
        const res = await db.collection('betbot').doc(id).set(rodadaJson)
        console.log('Item adcionado com sucesso')
    } catch (e) {
        console.error('Adição do item falhou', e)
    }
}

module.exports = {addLastItem}