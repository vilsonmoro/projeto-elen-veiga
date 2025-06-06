let pedidosPaginados = [];
let currentPage = 1;
const itemsPerPage = 10;

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear();
        window.location.href = "/login";
    }
}

async function searchPedido() {
    const codigo = document.getElementById('codigo').value.trim();
    const dataInicio = document.getElementById('dataInicio').value.trim();
    const dataFim = document.getElementById('dataFim').value.trim();
    const token = localStorage.getItem('token');

    const params = new URLSearchParams();
    if (codigo) params.append('id', codigo);
    if (dataInicio) params.append('dataInicio', dataInicio);
    if (dataFim) params.append('dataFim', dataFim);

    try {
        const response = await fetch(`pedido/buscar?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar pedidos');
        }

        const pedidos = await response.json();
        
        let filtrados = pedidos;
		if (codigo) {
			filtrados = filtrados.filter(c => String(c.id).includes(codigo));
		}

		populateResultsTable(filtrados);

    } catch (error) {
        console.error(error);
		M.toast({ html: `Erro ao buscar pedidos: ${error}`, classes: 'red' });
    }

}

function populateResultsTable(pedidos) {
    pedidosPaginados = pedidos;
    currentPage = 1;
    renderPage();
}

function renderPage() {
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = ''; 

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = pedidosPaginados.slice(startIndex, endIndex);

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum pedido encontrado</td></tr>';
        return;
    }

    pageItems.forEach(pedido => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.dataInicio}</td>
            <td>${pedido.dataFim}</td>
            <td>
                <button class="action-button" onclick="editpedido('${pedido.id}')">
                    <span class="material-icons">edit</span>
                </button>
                <button class="action-button" onclick="confirmDelete('${pedido.id}')">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('pageInfo').textContent = `Página ${currentPage}`;
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = endIndex >= pedidosPaginados.length;
}

function changePage(direction) {
    const totalPages = Math.ceil(pedidosPaginados.length / itemsPerPage);
    currentPage += direction;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    renderPage();
}

function clearSearch() {
    document.getElementById('codigo').value = '';
    document.getElementById('dataInicio').value = '';
    document.getElementById('dataFim').value = '';
    document.querySelector('#resultsTable tbody').innerHTML = '';
	pedidosPaginados = [];
    currentPage = 1;
    document.getElementById('pageInfo').textContent = 'Página 1';
    document.getElementById('prevButton').disabled = true;
    document.getElementById('nextButton').disabled = true;
}

async function editpedido(codigo) {
	const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/pedido/${codigo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Erro ao buscar pedido: ' + response.statusText);
            return;
        }

        const pedido = await response.json();

        localStorage.setItem('pedidoParaEditar', JSON.stringify(pedido));

        window.location.href = '/alterarpedido';

    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        alert('Erro inesperado ao buscar os dados do pedido.');
    }
}

async function confirmDelete(codigo) {
	const confirmed = confirm("Tem certeza que deseja excluir este pedido?");
    if (!confirmed) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/pedido/${codigo}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert("Pedido excluído com sucesso!");
            searchPedido();
        } else {
            const errorData = await response.json();
            alert("Erro ao excluir o pedido: " + (errorData.message || response.statusText));
        }
    } catch (error) {
        console.error("Erro ao excluir o pedido:", error);
        alert("Erro inesperado ao tentar excluir o pedido.");
    }
}