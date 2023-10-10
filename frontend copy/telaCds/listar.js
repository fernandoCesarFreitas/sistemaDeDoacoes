async function buscarUsuarios() {
    let resposta = await fetch('http://localhost:3000/cds');
    let cds = await resposta.json();
    console.log(cds);
    let corpoTabela =  document.getElementById('corpo-tabela');

    for (let cd of cds) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td')
        let tdNome = document.createElement('td');
        let tdCidade = document.createElement('td');
        let tdSituacao = document.createElement('td');
        let tdAcoes =  document.createElement('td')

        tdId.innerText = cd.id_CD;
        tdNome.innerText = cd.nome;
        tdCidade.innerText =  cd.cidade.nome;
        tdSituacao.innerText =  cd.situacao;
        
        tdAcoes.innerHTML = `<a href="index.html?id=${cd.id_CD}" class="btn-editar">Editar</a>
        <button onclick="excluir(${cd.id_CD})"  class="btn-excluir"">Excluir</button>`;//cria uma ancora de edicao
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdCidade);
        tr.appendChild(tdSituacao);
        tr.appendChild(tdAcoes);

        corpoTabela.appendChild(tr);
    }
}

async function excluir(id){
  await  fetch('http://localhost:3000/cds/'+id,{
    method: 'delete'
  });
  window.location.reload();
}

buscarUsuarios();