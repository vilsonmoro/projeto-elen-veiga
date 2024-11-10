    let currentPage = 1;
    const itemsPerPage = 10;

    function clearSearch() {
        document.getElementById('codigo').value = '';
        document.getElementById('cliente').value = '';
        document.getElementById('pedido').value = '';
        document.getElementById('dataInicio').value = '';
        document.getElementById('dataFim').value = '';
        alert('Campos de pesquisa limpos!');
    }

    async function searchPagamento() {
        const codigo = document.getElementById('codigo').value || null;
        const cliente = document.getElementById('cliente').value || null;
        const pedido = document.getElementById('pedido').value || null;
        const dataInicio = document.getElementById('dataInicio').value || null;
        const dataFim = document.getElementById('dataFim').value || null;

        const token = localStorage.getItem('token'); // Recupera o token do localStorage
        const response = await fetch(`/buscar?codigo=${codigo}&nomeCliente=${cliente}&codigoPedido=${pedido}&startDate=${dataInicio}&endDate=${dataFim}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Erro ao buscar pagamentos');
            return;
        }

        const pagamentos = await response.json();
        displayResults(pagamentos);
    }

    function displayResults(pagamentos) {
        const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedPagamentos = pagamentos.slice(start, end);

        paginatedPagamentos.forEach(pagamento => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${pagamento.codigo}</td>
                <td>${pagamento.cliente}</td>
                <td>${pagamento.valor}</td>
                <td>
                    <button class="action-button" onclick="editpagamento('${pagamento.codigo}')">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="action-button" onclick="confirmDelete('${pagamento.codigo}')">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            `;
        });

        updatePagination(pagamentos.length);
    }

    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${totalPages}`;

        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = currentPage === totalPages;
    }

    function changePage(direction) {
        currentPage += direction;
        searchPagamento();
    }

    function editpagamento(codigo) {
        window.location.href = `alterarpagamento.html?codigo=${codigo}`;
    }

    function confirmDelete(codigo) {
        const confirmed = confirm("Você tem certeza que deseja excluir este registro?");
        if (confirmed) {
            alert(`Registro com código ${codigo} excluído com sucesso!`);
            searchPagamento();
        }
    }

    function confirmLogout(event) {
        event.preventDefault();
        const confirmed = confirm("Você deseja realmente sair da aplicação?");
        if (confirmed) {
            window.location.href = "login.html";
        }
    }

