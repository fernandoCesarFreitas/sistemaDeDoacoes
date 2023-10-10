let email = document.getElementById("email");
let senha = document.getElementById("senha");
let form = document.getElementById('formulario');
form.addEventListener('submit', async (event) => {
    event.stopPropagation(); //para nao recarregar a pagina
    event.preventDefault();
    console.log(form)
    let payload = {
        email: email.value,
        senha: senha.value,
    }
    console.log(payload)
    let url = 'http://localhost:3000/login';
    let method = 'post';

    let resposta = await fetch(url, {
        method, //pode ser maiusculo ou minusculo
        headers: {
            'Content-Type': 'application/json', //o que esta enviando
            'Accept': 'application/json', //o que ira aceitar receber
        },
        body: JSON.stringify(payload) //converte o Json para texto
    });

    if (resposta.ok) { // .ok 
//salvar o token no local storage
        let dados = await resposta.json();
        console.log(dados)
        localStorage.setItem('authorization', `${dados.type} ${dados.token}`);

        window.location.href = '../telaInicial/home.html' //redireciona á pagina principal
    } else if (resposta.status == 401) {
        let dados = await resposta.json();
        alert(dados.mensagem);
    } else {
        alert('algo deu errado!')
    }
});