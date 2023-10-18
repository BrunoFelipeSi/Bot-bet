const puppeteer = require('puppeteer')
const cron = require('node-cron')
const betdb = require('./db.js')

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

async function run(){
    let browser
    console.log("Coletando dados do Arbety")
    try{
        browser = await puppeteer.launch({headless: 'new'})
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout( 2 * 60 * 500)
        await page.goto('https://www.arbety.com/games/double')
        function sleep(ms) {  
            return new Promise(resolve => setTimeout(resolve, ms))
        }
        const selector = '.item'
        await page.waitForSelector(selector)
        async function pegaItens(){
            const texto = await page.$$(".item")
            let arrayItens=[]
            for(let t of texto){
                arrayItens.push(await t.evaluate(x => x.textContent))
            }
            return arrayItens
        }

        function guardaUltimoItemBD (colecaoItens){
                cor = (colecaoItens[19] == 0) ? 'Branco' : (colecaoItens[19] < 8) ? 'Vermelho' : 'Verde'
                betdb.pool.query(`INSERT INTO rodadas (horario,cor,numero) VALUES (?,?,?)`,[dataAtualFormatada(),cor,colecaoItens[19]])
        }

        for (var i = 0; i < 200; i++){
            await page.waitForFunction(() => document.body.textContent.includes("Aguardando próxima rodada..."))
            await sleep(2300)
            let colecaoItens = await pegaItens()
            //console.log(colecaoItens)
            guardaUltimoItemBD(colecaoItens)
            await sleep(3500)
        }
        betdb.pool.end()
        await browser.close()

    } catch (e) {
        console.error('run failed', e)
    } finally {
        if (browser) {
            await browser.close()
        }
    }
}

run()

module.exports = {run}
