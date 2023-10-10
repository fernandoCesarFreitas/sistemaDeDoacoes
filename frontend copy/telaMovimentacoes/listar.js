async function buscarUsuarios() {
  let resposta = await fetch('http://localhost:3000/movimentacao');
  let movimentacoes = await resposta.json();
  console.log(movimentacoes);
  let corpoTabela = document.getElementById('corpo-tabela');

  for (let movimentacao of movimentacoes) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td')
    let tdData = document.createElement('td');
    let tdTipo = document.createElement('td');
    let tdItem = document.createElement('td');
    let tdQuantidade = document.createElement('td');
    let tdDoador = document.createElement('td');
    let tdBenificiario = document.createElement('td');
    let tdCidadeB = document.createElement('td');
    let tdCd = document.createElement('td');
    let tdCidadeC = document.createElement('td');
    let tdAcoes = document.createElement('td')

    const dataISO =movimentacao.data_Hora;

    // Crie um objeto Date a partir da string ISO
    const data = new Date(dataISO);

    // Extraia o dia, mês e ano da data
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então somamos 1
    const ano = data.getFullYear();

    // Formate a data como "dia/mês/ano"
    const dataFormatada = `${dia}/${mes}/${ano}`;

    tdId.innerText = movimentacao.id_movimentacao;
    tdData.innerText = dataFormatada;
    tdTipo.innerText = movimentacao.tipo;
    tdItem.innerText = movimentacao.cdItem.item.nome;
    tdQuantidade.innerText = movimentacao.quantidade;
    tdDoador.innerText = movimentacao.doador ? movimentacao.doador : '-';
    tdBenificiario.innerText = movimentacao.pessoas ? movimentacao.pessoas.nome : '-';
    tdCidadeB.innerText = movimentacao.pessoas ? movimentacao.pessoas.cidade.nome : '-'
    tdCd.innerText = movimentacao.cdItem.cd.nome;
    tdCidadeC.innerText = movimentacao.cdItem.cd.cidade.nome;

    tdAcoes.innerHTML = `<a href="index.html?id=${movimentacao.id_movimentacao}" class="btn-editar">Editar</a>
        <button onclick="excluir(${movimentacao.id_movimentacao})"  class="btn-excluir">excluir</button>`; //cria uma ancora de edicao
    tr.appendChild(tdId);
    tr.appendChild(tdData);
    tr.appendChild(tdTipo);
    tr.appendChild(tdItem);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdDoador);
    tr.appendChild(tdBenificiario);
    tr.appendChild(tdCidadeB);
    tr.appendChild(tdCd);
    tr.appendChild(tdCidadeC);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  await fetch('http://localhost:3000/movimentacao/' + id, {
    method: 'delete'
  });
  window.location.reload();
}

buscarUsuarios();