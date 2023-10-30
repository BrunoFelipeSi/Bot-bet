const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'db4free.net',
    user     : 'botnetuserdb',
    password : 'Onurb0928!',
    database : 'bdbotnet',
    debug    :  false
});


function dataAtualFormatada(){
    var data = new Date()
        dia  = data.getDate().toString().padStart(2, '0')
        mes  = (data.getMonth()+1).toString().padStart(2, '0') //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear()
        hora = data.getHours().toString().padStart(2, '0')
        min = data.getMinutes().toString().padStart(2, '0')
        sec = data.getSeconds().toString().padStart(2, '0')
    return ano+"-"+mes+"-"+dia+" "+hora+":"+min+":"+sec
}

function addLastItem (colecaoItens){
        cor = (colecaoItens[19] == 0) ? 'Branco' : (colecaoItens[19] < 8) ? 'Vermelho' : 'Verde'
        pool.query(`INSERT INTO rodadas (horario,cor,numero) VALUES (?,?,?)`,[dataAtualFormatada(),cor,colecaoItens[19]])
}


module.exports = {addLastItem}