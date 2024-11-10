function carregarRelatorio() {
    const dataInicio = document.querySelector('#dataInicio').value; // Obtenha a data de início do input
    const dataFim = document.querySelector('#dataFim').value; // Obtenha a data de fim do input
    
    if (!dataInicio || !dataFim) {
        alert('Por favor, preencha ambas as datas.');
        return;
    }

    fetch(`/venda/fluxo-caixa?dataInicio=${dataInicio}&dataFim=${dataFim}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('#relatorioFluxoCaixa tbody');
            tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
            
            let totalEntradas = 0;
            let totalSaidas = 0;

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.data}</td>
                    <td>${item.codigoProduto || ''}</td>
                    <td>${item.codigoVenda || ''}</td>
                    <td>${item.tipo === 'saida' ? item.valor : 0}</td>
                    <td>${item.tipo === 'entrada' ? item.valor : 0}</td>
                `;
                tbody.appendChild(tr);

                if (item.tipo === 'entrada') totalEntradas += item.valor;
                if (item.tipo === 'saida') totalSaidas += item.valor;
            });

            // Adiciona totais ao final da tabela
            const trTotal = document.createElement('tr');
            trTotal.innerHTML = `
                <td colspan="4">Total Entradas</td>
                <td>${totalEntradas}</td>
            `;
            tbody.appendChild(trTotal);

            const trTotalSaidas = document.createElement('tr');
            trTotalSaidas.innerHTML = `
                <td colspan="4">Total Saídas</td>
                <td>${totalSaidas}</td>
            `;
            tbody.appendChild(trTotalSaidas);

            const saldo = totalEntradas - totalSaidas;
            const trSaldo = document.createElement('tr');
            trSaldo.innerHTML = `
                <td colspan="4">Saldo</td>
                <td>${saldo}</td>
            `;
            tbody.appendChild(trSaldo);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar o relatório. Tente novamente.');
        });
}

// Exemplo de função para logout
function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
}
