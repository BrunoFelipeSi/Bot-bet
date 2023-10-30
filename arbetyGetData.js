//Entra na página do arbety e pegas um array com os últimos 20 itens.
const puppeteer = require('puppeteer')
const bdmysql = require('./bdmysql.js')

let colecaoItens = []
async function run(){
    let browser
    console.log("Coletando dados do Arbety")
    try{
        browser = await puppeteer.launch({headless: 'new'})
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(60000)
        await page.goto('https://www.arbety.com/games/double', { waitUntil: 'load' , timeout: 60000})
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

        for (var i = 0; i < 3650; i++){
            await page.waitForFunction(() => document.body.textContent.includes("Aguardando próxima rodada..."))// "Waiting for next round..."
            await sleep(2300)
            colecaoItens = await pegaItens()
            bdmysql.addLastItem(colecaoItens)
            await sleep(3500)
        }
        
        await browser.close()

    } catch (e) {
        console.error('A execução falhou', e)
    } finally {
        if (browser) {
            await browser.close()
        }
    }
}

function pushArrayItens(){
    return colecaoItens
}

module.exports = {run, pushArrayItens}
