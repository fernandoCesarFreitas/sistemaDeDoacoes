async function buscarUsuarios() {
    let resposta = await fetch('http://localhost:3000/itens');
    let itens = await resposta.json();
    console.log(itens);
    let corpoTabela =  document.getElementById('corpo-tabela');

    for (let item of itens) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td')
        let tdNome = document.createElement('td');
        let tdCategoria = document.createElement('td');
        let tdSituacao = document.createElement('td');
        let tdAcoes =  document.createElement('td')

        tdId.innerText = item.id_item;
        tdNome.innerText = item.nome;
        tdCategoria.innerText =  item.categoria.descricao;
        tdSituacao.innerText =  item.situacao;
        
        tdAcoes.innerHTML = `<a href="index.html?id=${item.id_item}" class="btn-editar">Editar</a>
        <button onclick="excluir(${item.id_item})" class="btn-excluir">excluir</button>`;//cria uma ancora de edicao
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdSituacao);
        tr.appendChild(tdAcoes);

        corpoTabela.appendChild(tr);
    }
}

async function excluir(id){
  await  fetch('http://localhost:3000/itens/'+id,{
    method: 'delete'
  });
  window.location.reload();
}

buscarUsuarios();