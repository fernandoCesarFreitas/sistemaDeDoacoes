const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


let nome = document.getElementById("nome");
let form = document.getElementById('formulario');
let stateSelect = document.getElementById('state');

async function buscarDados(){
    let resposta = await fetch('http://localhost:3000/cds/'+id);
    if(resposta.ok){
        let cds = await resposta.json();
        nome.value =  cds.nome;
        stateSelect.value = cds.cidade_id_cidade;
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
async function getStates () {
    let response = await fetch('http://localhost:3000/cidades');
    let cidades = await response.json();
    return cidades;
  }

  async function setStates () {
    let states = await getStates();
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    stateSelect.appendChild(selectOption);
  
    for (let state of states) {
      let option = document.createElement('option');
      option.value = state.id_cidade;
      option.innerText = state.nome;
      stateSelect.appendChild(option);
    }
}
setStates();

form.addEventListener('submit', async (event) => {
    event.stopPropagation();//para nao recarregar a pagina
    event.preventDefault();

    let payload = {
        nome: nome.value,
        situacao: 'A',
        cidade_id_cidade : state.value,
    }
    
    console.log(payload)

    let url = 'http://localhost:3000/cds';
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
        alert('CD salvo com sucesso!')
        window.location.href = 'index.html' //redireciona á pagina principal
    } else {
        alert('Ops, algo deu errado!');
    }
    
});

