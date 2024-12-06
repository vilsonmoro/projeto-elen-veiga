    let currentPage = 1;
    const itemsPerPage = 10;

    function clearSearch() {
        document.getElementById('codigo').value = '';
        document.getElementById('cliente').value = '';
        document.getElementById('pedido').value = '';
        document.getElementById('dataInicio').value = '';
        document.getElementById('dataFim').value = '';
        currentPage = 1;
        updatePagination();
    }

    async function editVenda(codigo) {
        const token = localStorage.getItem('token');

        // 1. Buscar o código do cliente
        const clienteNome = document.getElementById('cliente').value;
        const clienteResponse = await fetch(`/api/cliente/pesquisa?nome=${clienteNome}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!clienteResponse.ok) {
            alert('Erro ao buscar cliente: ' + clienteResponse.statusText);
            return;
        }
        const clientes = await clienteResponse.json();
        const clienteId = clientes[0]?.id; // Pega o primeiro cliente encontrado

        // 2. Buscar o código do pedido
        const pedidoNumero = document.getElementById('pedido').value;
        const pedidoResponse = await fetch(`/api/pedido/buscar?codigo=${pedidoNumero}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!pedidoResponse.ok) {
            alert('Erro ao buscar pedido: ' + pedidoResponse.statusText);
            return;
        }
        const pedidos = await pedidoResponse.json();
        const pedidoId = pedidos[0]?.id; // Pega o primeiro pedido encontrado

        // 3. Buscar os produtos da venda (supondo que você tenha um método para isso)
        const produtosResponse = await fetch(`/api/produtovenda/buscar?codigoVenda=${codigo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!produtosResponse.ok) {
            alert('Erro ao buscar produtos: ' + produtosResponse.statusText);
            return;
        }
        const produtos = await produtosResponse.json();

        // 4. Montar o objeto de atualização
        const vendaAtualizada = {
            clienteId: clienteId,
            pedidoId: pedidoId,
            produtos: produtos, // ou um objeto específico, dependendo da estrutura esperada
            dataInicio: document.getElementById('dataInicio').value,
            dataFim: document.getElementById('dataFim').value
        };

        // 5. Chamar a API de atualização (PUT)
        const updateResponse = await fetch(`/api/venda/${codigo}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendaAtualizada)
        });

        if (!updateResponse.ok) {
            alert('Erro ao atualizar venda: ' + updateResponse.statusText);
            return;
        }

        alert('Venda atualizada com sucesso!');
        searchVenda(); // Atualiza a lista após a edição
    }

    function displayResults(filteredVendas) {
        const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedVendas = filteredVendas.slice(start, end);

        paginatedVendas.forEach(venda => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${venda.codigo}</td>
                <td>${venda.cliente}</td>
                <td>${venda.valor}</td>
                <td>
                    <button class="action-button" onclick="editvenda('${venda.codigo}')">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="action-button" onclick="confirmDelete('${venda.codigo}')">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            `;
        });
        updatePagination(filteredVendas.length);
    }

    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${totalPages}`;

        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = currentPage === totalPages;
    }

    function changePage(direction) {
        currentPage += direction;
        searchVenda();
    }

    function editvenda(codigo) {
        window.location.href = `alterarvenda.html?codigo=${codigo}`;
    }

    function confirmDelete(codigo) {
        const confirmed = confirm("Você tem certeza que deseja excluir este registro?");
        if (confirmed) {
            alert(`Registro com código ${codigo} excluído com sucesso!`);
            searchVenda();
        }
    }

    function confirmLogout(event) {
        event.preventDefault();
        const confirmed = confirm("Você deseja realmente sair da aplicação?");
        if (confirmed) {
            window.location.href = "login.html";
        }
    }
