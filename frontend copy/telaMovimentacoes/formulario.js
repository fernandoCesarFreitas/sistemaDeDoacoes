const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


let nome = document.getElementById("nome");
let form = document.getElementById('formulario');
let stateSelect = document.getElementById('state');
let cdSelect = document.getElementById('cd');
let tipo = document.getElementById('tipo');
let pessoaSelect = document.getElementById('pessoa');
const doadorInput = document.getElementById('doador');

async function buscarDados() {
    let resposta = await fetch('http://localhost:3000/movimentacao/' + id);
    if (resposta.ok) {
        let movimentacao = await resposta.json();
        doador.value = movimentacao.doador;
        console.log(movimentacao)
        pessoaSelect.value = movimentacao.pessoas_id_pessoas;
        cdSelect.value = movimentacao.cdItem.cd_id;
        stateSelect.value = movimentacao.cdItem.item_id;
        console.log(movimentacao.cdItem.item_id)
        quantidade.value = movimentacao.quantidade;
    } else if (resposta.status === 422) {
        let e = await resposta.json();
        alert(e.error);
    } else {
        console.log('aki')
        alert('Ops! algo deu errado na busca');
    }
}

if (id) {
    buscarDados();
}
async function getCds() {
    let response = await fetch('http://localhost:3000/cds');
    let cds = await response.json();
    console.log(cds)
    return cds;
}

async function setCds() {
    let cds = await getCds();
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    cdSelect.appendChild(selectOption);

    for (let cd of cds) {
        let option = document.createElement('option');
        option.value = cd.id_CD;
        option.innerText = cd.nome;
        cdSelect.appendChild(option);
    }
}
setCds();

async function getStates() {
    let response = await fetch('http://localhost:3000/itens');
    let itens = await response.json();
    console.log(itens)
    return itens;
}

async function setStates() {
    let states = await getStates();
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    stateSelect.appendChild(selectOption);

    for (let state of states) {
        let option = document.createElement('option');
        option.value = state.id_item;
        option.innerText = state.nome;
        stateSelect.appendChild(option);
    }
}
setStates();

async function getPessoas() {
    let response = await fetch('http://localhost:3000/pessoas');
    let pessoas = await response.json();
    console.log(pessoas)
    return pessoas;
}

async function setPessoas() {
    let pessoas = await getPessoas();
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    pessoaSelect.appendChild(selectOption);

    for (let pessoa of pessoas) {
        let option = document.createElement('option');
        option.value = pessoa.idPessoa;
        option.innerText = pessoa.nome;
        pessoaSelect.appendChild(option);
    }
}
setPessoas();

tipo.addEventListener('change', function () {
    // Verifique se a categoria selecionada é "Efetuar Doação"
    if (tipo.value === 'saida') {
        // Adicione a classe "disabled" para tornar o campo "Doador" transparente e não clicável
        doadorInput.classList.add('disabled');

        // Defina o valor do campo de doador como vazio
        doadorInput.value = '';
    } else {
        // Caso contrário, remova a classe "disabled" para tornar o campo "Doador" normal
        doadorInput.classList.remove('disabled');
    }
});
tipo.addEventListener('change', function () {
    // Verifique se a categoria selecionada é "Efetuar Doação"
    if (tipo.value === 'entrada') {
        // Adicione a classe "disabled" para tornar o campo "Doador" transparente e não clicável
        pessoaSelect.classList.add('disabled');

        // Defina o valor do campo de doador como vazio
        pessoaSelect.value = '';
    } else {
        // Caso contrário, remova a classe "disabled" para tornar o campo "Doador" normal
        pessoaSelect.classList.remove('disabled');
    }
});

form.addEventListener('submit', async (event) => {
    event.stopPropagation(); //para nao recarregar a pagina
    event.preventDefault();

    let payload = {
        tipo: tipo.value,
        quantidade: tipo.value === 'saida' ? -Math.abs(quantidade.value) : Math.abs(quantidade.value),
        doador: doador.value === "" ? null : doador.value,
        pessoa_id_pessoa: pessoa.value === "" ? null : pessoa.value, //
        // cd_item_idcd_item:cd.value,
        cd_id: cd.value,
        item_id: state.value,
    }



    console.table(payload)

    let url = 'http://localhost:3000/movimentacao';
    let method = 'POST';

    if (id) {
        url += '/' + id;
        method = 'put';
    }

    let resposta = await fetch(url, {
        method, //pode ser maiusculo ou minusculo
        headers: {
            'Content-Type': 'application/json', //o que esta enviando
            'Accept': 'application/json', //o que ira aceitar receber
        },
        body: JSON.stringify(payload) //converte o Json para texto

    });
    if (resposta.ok) { // .ok 
        const resultado = await resposta.json();
        alert(resultado.success); 
        window.location.href = 'index.html' //redireciona á pagina principal
    } else {
        const mensagemErro = await resposta.json(); // Transforma a resposta de erro em objeto JSON
        alert(`Erro: ${mensagemErro.error}`);
        window.location.href = 'index.html'
    }


});