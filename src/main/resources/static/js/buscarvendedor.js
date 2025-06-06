let vendedoresPaginados = [];
let currentPage = 1;
const itemsPerPage = 10;

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear(); // Limpa todas as informações do localStorage
        window.location.href = "/login";
    }
}

async function searchVendedor() {
    const token = localStorage.getItem('token');
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const statusInput = document.getElementById('status').value;
    const status = statusInput ? statusInput.toUpperCase() : null;

    const params = new URLSearchParams();
    if (codigo) params.append('id', codigo);
    if (nome) params.append('nome', nome);
    if (sobrenome) params.append('sobrenome', sobrenome);
    if (status) params.append('status', status);

    try {
        const response = await fetch(`/vendedor/buscar?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Erro ao buscar vendedores: ' + response.statusText);
            return;
        }

        const vendedores = await response.json();
        populateResultsTable(vendedores);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function populateResultsTable(vendedores) {
    vendedoresPaginados = vendedores;
    currentPage = 1;
    renderPage(); // Só renderiza os da página atual
}

async function editvendedor(codigo) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/vendedor/${codigo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Erro ao buscar vendedor: ' + response.statusText);
            return;
        }

        const vendedor = await response.json();

        // Salva os dados no localStorage
        localStorage.setItem('vendedorParaEditar', JSON.stringify(vendedor));

        // Redireciona para a página de alteração
        window.location.href = '/alterarvendedor';

    } catch (error) {
        console.error('Erro ao buscar vendedor:', error);
        alert('Erro inesperado ao buscar os dados do vendedor.');
    }
}

async function confirmDelete(id) {
    const confirmed = confirm("Tem certeza que deseja excluir este vendedor?");
    if (!confirmed) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/vendedor/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert("Vendedor excluído com sucesso!");
            searchVendedor(); // Recarrega a lista
        } else {
            const errorData = await response.json();
            alert("Erro ao excluir vendedor: " + (errorData.message || response.statusText));
        }
    } catch (error) {
        console.error("Erro ao excluir vendedor:", error);
        alert("Erro inesperado ao tentar excluir o vendedor.");
    }
}


function renderPage() {
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = ''; // Limpa resultados anteriores

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = vendedoresPaginados.slice(startIndex, endIndex);

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum vendedor encontrado</td></tr>';
        return;
    }

    pageItems.forEach(vendedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vendedor.id}</td>
            <td>${vendedor.nome}</td>
            <td>${vendedor.sobrenome}</td>
            <td>${vendedor.statusVendedor}</td>
            <td>
                <button class="action-button" onclick="editvendedor('${vendedor.id}')">
                    <span class="material-icons">edit</span>
                </button>
                <button class="action-button" onclick="confirmDelete('${vendedor.id}')">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Atualiza info da paginação
    document.getElementById('pageInfo').textContent = `Página ${currentPage}`;
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = endIndex >= vendedoresPaginados.length;
}

function changePage(direction) {
    const totalPages = Math.ceil(vendedoresPaginados.length / itemsPerPage);
    currentPage += direction;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    renderPage();
}

function clearSearch() {
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('status').value = '';
    document.querySelector('#resultsTable tbody').innerHTML = '';
    vendedoresPaginados = [];
    currentPage = 1;
    document.getElementById('pageInfo').textContent = 'Página 1';
    document.getElementById('prevButton').disabled = true;
    document.getElementById('nextButton').disabled = true;
}

// Validação para submissão do formulário de cadastro de vendedor
document.addEventListener('DOMContentLoaded', function () {
    const botaoCadastro = document.querySelector('.btn'); // Certifique-se de que essa é a classe do botão de envio

    if (botaoCadastro) {
        botaoCadastro.addEventListener('click', function (e) {
            const nome = document.getElementById('nome').value.trim();
            const desconto = document.getElementById('desconto') ? document.getElementById('desconto').value.trim() : '';
            const status = document.getElementById('status').value;

            const mensagens = [];

            if (!nome) mensagens.push("Nome");
            if (!desconto) mensagens.push("Desconto");
            if (!status) mensagens.push("Status");

            if (mensagens.length > 0) {
                e.preventDefault();
                alert(`Os seguintes campos são obrigatórios: ${mensagens.join(', ')}`);
                return;
            }

            // Validação opcional do desconto
            if (desconto && (parseFloat(desconto) < 0 || parseFloat(desconto) > 100)) {
                e.preventDefault();
                alert('O desconto deve ser um valor entre 0 e 100.');
                return;
            }
        });
    }
});
