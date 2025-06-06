let produtosPaginados = [];
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

async function searchProduto() {
    const codigo = document.getElementById('codigo').value || null;
    const nome = document.getElementById('nome').value || null;
    const token = localStorage.getItem('token'); 

    const params = new URLSearchParams();
    if (codigo) params.append('id', codigo);
    if (nome) params.append('nome', nome);

    try {
    const response = await fetch(`/produto/buscar?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        alert('Erro ao buscar produtos: ' + response.statusText);
        return;
    }

    const produtos = await response.json();
    populateResultsTable(produtos);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function populateResultsTable(produtos) {
    produtosPaginados = produtos;
    currentPage = 1;
    renderPage();
}

function renderPage() {
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = produtosPaginados.slice(startIndex, endIndex);

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum produto encontrado</td></tr>';
        return;
    }

    pageItems.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>
                <button class="action-button" onclick="editproduto('${produto.id}')">
                    <span class="material-icons">edit</span>
                </button>
                <button class="action-button" onclick="confirmDelete('${produto.id}')">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('pageInfo').textContent = `Página ${currentPage}`;
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = endIndex >= produtosPaginados.length;
}

function changePage(direction) {
    const totalPages = Math.ceil(produtosPaginados.length / itemsPerPage);
    currentPage += direction;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    renderPage();
}

function clearSearch() {
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.querySelector('#resultsTable tbody').innerHTML = '';
    produtosPaginados = [];
    currentPage = 1;
    document.getElementById('pageInfo').textContent = 'Página 1';
    document.getElementById('prevButton').disabled = true;
    document.getElementById('nextButton').disabled = true;
}

async function editproduto(codigo) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/produto/${codigo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Erro ao buscar produto: ' + response.statusText);
            return;
        }

        const produto = await response.json();

        localStorage.setItem('produtoParaEditar', JSON.stringify(produto));
        window.location.href = '/alterarproduto';

    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        alert('Erro inesperado ao buscar os dados do produto.');
    }
}

async function confirmDelete(id) {
    const confirmed = confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmed) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/produto/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert("Produto excluído com sucesso!");
            searchProduto(); // Recarrega a lista
        } else {
            const errorData = await response.json();
            alert("Erro ao excluir o produto: " + (errorData.message || response.statusText));
        }
    } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        alert("Erro inesperado ao tentar excluir o produto.");
    }
}
