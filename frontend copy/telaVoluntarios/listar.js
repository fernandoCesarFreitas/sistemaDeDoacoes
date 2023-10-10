async function buscarUsuarios() {
    let resposta = await fetch('http://localhost:3000/voluntarios');
    let usuarios = await resposta.json();
    console.log(usuarios);
    let corpoTabela =  document.getElementById('corpo-tabela');

    for (let usuario of usuarios) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td')
        let tdNome = document.createElement('td');
        let tdEmail = document.createElement('td');
        let tdSituacao = document.createElement('td');
        let tdAcoes =  document.createElement('td')

        tdId.innerText = usuario.idvoluntario;
        tdNome.innerText = usuario.nome;
        tdEmail.innerText = usuario.email;
        tdSituacao.innerText =  usuario.situacao;
        
        tdAcoes.innerHTML = `<a href="index.html?id=${usuario.idvoluntario}" class="btn-editar">Editar</a>
        <button onclick="excluir(${usuario.idvoluntario})"   class="btn-excluir">excluir</button>`;//cria uma ancora de edicao
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdSituacao);
        tr.appendChild(tdAcoes);

        corpoTabela.appendChild(tr);
    }
}

async function excluir(id){
  await  fetch('http://localhost:3000/voluntarios/'+id,{
    method: 'delete'
  });
  window.location.reload();
}

buscarUsuarios();