let currentPage = 1;
const itemsPerPage = 10;

function clearSearch() {
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    alert('Campos de pesquisa limpos!');
}

async function searchProduto() {
    const codigo = document.getElementById('codigo').value || null;
    const nome = document.getElementById('nome').value || null;

    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    const response = await fetch(`/buscar?codigo=${codigo}&nome=${nome}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        alert('Erro ao buscar produtos');
        return;
    }

    const produtos = await response.json();
    displayResults(produtos);
}

function displayResults(produtos) {
    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProdutos = produtos.slice(start, end);

    paginatedProdutos.forEach(produto => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>
                <button class="action-button" onclick="editProduto('${produto.codigo}')">
                    <span class="material-icons">edit</span>
                </button>
                <button class="action-button" onclick="confirmDelete('${produto.codigo}')">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        `;
    });

    updatePagination(produtos.length);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${totalPages}`;

    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = currentPage === totalPages;
}

function changePage(direction) {
    currentPage += direction;
    searchProduto();
}

function editProduto(codigo) {
    window.location.href = `alterarproduto.html?codigo=${codigo}`;
}

function confirmDelete(codigo) {
    const confirmed = confirm("Você tem certeza que deseja excluir este registro?");
    if (confirmed) {
        alert(`Registro com código ${codigo} excluído com sucesso!`);
        searchProduto();
    }
}

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
}