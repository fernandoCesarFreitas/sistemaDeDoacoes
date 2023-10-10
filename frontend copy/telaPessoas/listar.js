async function buscarUsuarios() {
    let resposta = await fetch('http://localhost:3000/pessoas');
    let usuarios = await resposta.json();
    console.log(usuarios);
    let corpoTabela =  document.getElementById('corpo-tabela');

    for (let usuario of usuarios) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td')
        let tdNome = document.createElement('td');
        let tdEndereco = document.createElement('td');
        let tdCidade = document.createElement('td');
        let tdAcoes =  document.createElement('td')

        tdId.innerText = usuario.idPessoa;
        tdNome.innerText = usuario.nome;
        tdEndereco.innerText = usuario.endereco;
        tdCidade.innerText =  usuario.cidade.nome;
        
        tdAcoes.innerHTML = `<a href="index.html?id=${usuario.idPessoa}" class="btn-editar">Editar</a>
        <button onclick="excluir(${usuario.idPessoa})"  class="btn-excluir">excluir</button>`;//cria uma ancora de edicao
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdEndereco);
        tr.appendChild(tdCidade);
        tr.appendChild(tdAcoes);

        corpoTabela.appendChild(tr);
    }
}

async function excluir(id){
  await  fetch('http://localhost:3000/pessoas/'+id,{
    method: 'delete'
  });
  window.location.reload();
}

buscarUsuarios();