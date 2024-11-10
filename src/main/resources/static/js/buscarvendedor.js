async function updateVendedor(codigo) {
    const token = localStorage.getItem('token'); // Obtendo o token do localStorage

    // Primeiro, fazemos a requisição GET para obter o vendedor pelo código
    const getResponse = await fetch(`/api/vendedor/${codigo}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!getResponse.ok) {
        alert('Erro ao buscar vendedor: ' + getResponse.statusText);
        return;
    }

    const vendedor = await getResponse.json();

    // Aqui você pode atualizar as informações do vendedor como necessário
    // Por exemplo, vamos alterar o nome e o sobrenome
    vendedor.nome = prompt("Novo nome:", vendedor.nome) || vendedor.nome;
    vendedor.sobrenome = prompt("Novo sobrenome:", vendedor.sobrenome) || vendedor.sobrenome;

    // Agora fazemos a requisição PUT para atualizar o vendedor
    const putResponse = await fetch(`/api/vendedor/${codigo}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vendedor)
    });

    if (!putResponse.ok) {
        alert('Erro ao atualizar vendedor: ' + putResponse.statusText);
        return;
    }

    alert('Vendedor atualizado com sucesso!');
    searchVendedor(); // Atualiza a lista de vendedores após a atualização
}

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
  }

  async function searchVendedor() {
    const token = localStorage.getItem('token'); // Obtendo o token do localStorage
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const status = document.getElementById('status').value;

    // Monta a URL com os parâmetros de busca
    const params = new URLSearchParams();
    if (codigo) params.append('id', codigo);
    if (nome) params.append('nome', nome);
    if (sobrenome) params.append('sobrenome', sobrenome);
    if (status) params.append('status', status);

    try {
        const response = await fetch(`/api/buscar?${params.toString()}`, {
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
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = ''; // Limpa resultados anteriores

    if (vendedores.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum vendedor encontrado</td></tr>';
        return;
    }

    vendedores.forEach(vendedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vendedor.codigo}</td>
            <td>${vendedor.nome}</td>
            <td>${vendedor.sobrenome}</td>
            <td>${vendedor.status}</td>
            <td>
                <button class="action-button" onclick="updateVendedor(${vendedor.codigo})">
                    <span class="material-icons">edit</span>
                </button>
                <!-- Outros botões de ação podem ser adicionados aqui -->
            </td>
        `;
        tbody.appendChild(row);
    });
}

function clearSearch() {
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('status').value = '';
    document.querySelector('#resultsTable tbody').innerHTML = ''; // Limpa a tabela
}

