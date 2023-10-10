const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let authorization = localStorage.getItem('authorization'); //busca o token do localStorage

if (!authorization) {
  window.location.href = 'login.html'; //se nao tiver volta para a atela de login
}

let nome = document.getElementById("nome");
let form = document.getElementById('formulario');
let stateSelect = document.getElementById('state');

async function buscarDados(){
    let resposta = await fetch('http://localhost:3000/voluntarios/'+id);
    if(resposta.ok){
        let voluntarios = await resposta.json();
        nome.value =  voluntarios.nome;
        email.value = voluntarios.email;
       
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
        nome: nome.value,
        email: email.value,
        senha : senha.value,
        situacao: 'A',
    }
    
    console.log(payload)

    let url = 'http://localhost:3000/voluntarios';
    let method = 'POST';

    if(id) {
        url+='/'+id;
        method = 'put';
    }

    let resposta = await fetch(url, {
        method,//pode ser maiusculo ou minusculo
        headers: {
            'Content-Type': 'application/json',//o que esta enviando
            'Accept': 'application/json',
            'Authorization': authorization,//o que ira aceitar receber
        },
        body: JSON.stringify(payload)//converte o Json para texto
   
    });
    if (resposta.ok) {// .ok 
        alert('Voluntário salvo com sucesso!')
        window.location.href = 'index.html' //redireciona á pagina principal
    } else {
        alert('Ops, algo deu errado!');
    }
    
});

