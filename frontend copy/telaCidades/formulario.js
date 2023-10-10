const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


let nome = document.getElementById("nome");
let form = document.getElementById('formulario');

async function buscarDados(){
    let resposta = await fetch('http://localhost:3000/cidades/'+id);
    if(resposta.ok){
        let cidades = await resposta.json();
        nome.value =  cidades.nome;
    }else if(resposta.status===422){
        let e = await resposta.json();
        alert(e.error);
    }else {
        alert('Ops! algo deu errado na busca');
    }
}

if(id){
    buscarDados();
}

form.addEventListener('submit', async (event) => {
    event.stopPropagation();//para nao recarregar a pagina
    event.preventDefault();

    let payload = {
        nome: nome.value
    }
    
    console.log(payload)

    let url = 'http://localhost:3000/cidades';
    let method = 'POST';

    if(id) {
        url+='/'+id;
        method = 'put';
    }

    let resposta = await fetch(url, {
        method,//pode ser maiusculo ou minusculo
        headers: {
            'Content-Type': 'application/json',//o que esta enviando
            'Accept': 'application/json',//o que ira aceitar receber
        },
        body: JSON.stringify(payload)//converte o Json para texto
   
    });
    if (resposta.ok) {// .ok 
        alert('Cidade salva com sucesso!')
        window.location.href = 'index.html' //redireciona á pagina principal
    } else {
        alert('Ops, algo deu errado!');
    }
});