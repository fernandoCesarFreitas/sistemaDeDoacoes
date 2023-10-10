async function buscarUsuarios() {
    let resposta = await fetch('http://localhost:3000/categorias');
    let usuarios = await resposta.json();
  
    let corpoTabela =  document.getElementById('corpo-tabela');

    for (let usuario of usuarios) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td')
        let tdNome = document.createElement('td');
        let tdAcoes =  document.createElement('td')

        tdId.innerText = usuario.id_categoria;
        tdNome.innerText = usuario.descricao;
        tdAcoes.innerHTML = `<a href="index.html?id=${usuario.id_categoria}" class="btn-editar">Editar</a>
        <button onclick="excluir(${usuario.id_categoria})"  class="btn-excluir"">excluir</button>`;//cria uma ancora de edicao
        tr.appendChild(tdId)
        tr.appendChild(tdNome);
        tr.appendChild(tdAcoes);

        corpoTabela.appendChild(tr);
    }
}

async function excluir(id){
  await  fetch('http://localhost:3000/categorias/'+id,{
    method: 'delete'
  });
  window.location.reload();
}

buscarUsuarios();

