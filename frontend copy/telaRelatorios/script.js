async function listarQuantidadeTotalDeItensEmTodosOsCDs() {
    try {
        const response = await fetch('http://localhost:3000/relatorio');
        const data = await response.json();
        const resultadosDiv = document.getElementById('resultados');
        // Verifica se a resposta é um objeto
        if (typeof data === 'object' && data !== null) {
            resultadosDiv.innerHTML = '<h2>Quantidade total de itens em todos os CDs:</h2>';
            const listaResultados = document.createElement('ul');

            // Itera pelas propriedades do objeto
            for (const cdNome in data) {
                if (data.hasOwnProperty(cdNome)) {
                    const cdItens = data[cdNome];

                    const cdHeader = document.createElement('h3');
                    cdHeader.textContent = cdNome;
                    listaResultados.appendChild(cdHeader);

                    const cdLista = document.createElement('ul');
                    for (const itemNome in cdItens) {
                        if (cdItens.hasOwnProperty(itemNome)) {
                            const quantidadeTotal = cdItens[itemNome];

                            const li = document.createElement('li');
                            li.textContent = `Nome: ${itemNome}, Quantidade Total: ${quantidadeTotal}`;
                            cdLista.appendChild(li);
                        }
                    }
                    listaResultados.appendChild(cdLista);
                }
            }

            resultadosDiv.appendChild(listaResultados);
        } else {
            resultadosDiv.textContent = 'Resposta inválida da API: não é um objeto JSON.';
        }
    } catch (error) {
        console.error('Erro ao listar a quantidade total de itens em todos os CDs:', error);
    }
}

listarQuantidadeTotalDeItensEmTodosOsCDs()
