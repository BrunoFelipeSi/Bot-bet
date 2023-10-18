const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'mysqlbet',
    password : 'Onurb0928!',
    database : 'arbety_double',
    debug    :  false
});

module.exports = {pool}

//PARA FAZER SELECT
// betdb.pool.query("SELECT * FROM rodadas",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     // rows fetch
//     console.log(data);
//     });

//PARA INSERIR
// betdb.pool.query(`INSERT INTO rodadas(horario,cor,numero)
//     VALUES('2023-10-15 17:45:25','Verde','6')`)
//betdb.pool.query(`INSERT INTO rodadas (horario,cor,numero) VALUES (?,?,?)`,[dataAtualFormatada(),'verde','11']) //inserir como função ou variável

//PARA REMOVER
// betdb.pool.query(`DELETE FROM rodadas WHERE idrodadas = '6'`)

// pool.query("SELECT * FROM rodadas",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     // rows fetch
//     console.log(data);
// });



//console.log(selecionaTodas)

// close the MySQL connection

