
//Não adicionar pacotes do node aqui (O DOM não reconhece). Acho q para acessar o BD tb será
//via fetch/api
let array = []
function getArrayItens(){
    fetch('http://localhost:8080/read')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            array = data
        })
        let textArea = document.getElementById('last20itens')
        textArea.value = array
}