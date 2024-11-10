async function editUser(codigo) {
    // Primeiro, vamos buscar o usuário pelo código
    const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage

    const response = await fetch(`/api/usuario/${codigo}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        alert('Erro ao buscar usuário: ' + response.statusText);
        return;
    }

    const user = await response.json();

    // Agora você pode preencher os campos do formulário com os dados do usuário
    document.getElementById('codigo').value = user.codigo;
    document.getElementById('nome').value = user.nome;
    document.getElementById('sobrenome').value = user.sobrenome;

    // Adiciona um botão para salvar as alterações
    const saveButton = document.createElement('button');
    saveButton.className = 'btn waves-effect waves-light';
    saveButton.innerText = 'Salvar';
    saveButton.onclick = async function () {
        // Quando o botão for clicado, atualiza o usuário
        await updateUser(codigo);
    };
    document.querySelector('.button-container').appendChild(saveButton);
}

async function updateUser(codigo) {
    const token = localStorage.getItem('token');
    const userData = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value
    };

    const response = await fetch(`/api/usuario/${codigo}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        alert('Erro ao atualizar usuário: ' + response.statusText);
        return;
    }

    alert('Usuário atualizado com sucesso!');
    // Opcional: redirecionar ou atualizar a lista de usuários
    searchUsers();
}

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
  }

  async function searchUsers() {
    const token = localStorage.getItem('token'); // Token de autenticação
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;

    // Monta a URL com os parâmetros de busca
    const params = new URLSearchParams();
    if (codigo) params.append('id', codigo);
    if (nome) params.append('nome', nome);
    if (sobrenome) params.append('sobrenome', sobrenome);

    try {
        const response = await fetch(`/api/buscar?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Erro ao buscar usuários: ' + response.statusText);
            return;
        }

        const usuarios = await response.json();
        populateResultsTable(usuarios);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function populateResultsTable(usuarios) {
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = ''; // Limpa resultados anteriores

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum usuário encontrado</td></tr>';
        return;
    }

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.codigo}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.sobrenome}</td>
            <td>
                <button class="action-button" onclick="editUser(${usuario.codigo})">
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
    document.querySelector('#resultsTable tbody').innerHTML = ''; // Limpa a tabela
}

