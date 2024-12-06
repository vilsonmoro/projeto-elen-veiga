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
        const response = await fetch(`/usuario/buscar?${params.toString()}`, {
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
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.sobrenome}</td>
            <td>
                <button class="action-button" onclick="editUser(${usuario.id})">
                    <span class="material-icons">edit</span>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function editUser(id) {
    // Redireciona para a página alterarusuario passando o id como parâmetro na URL
    window.location.href = `/alterarusuario/${id}`;
}

// Função para tratar o caso de um usuário ser editado
async function loadUserDataForEdit() {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('ID do usuário não fornecido.');
        return;
    }

    const response = await fetch(`/usuario/${id}`, {
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

    // Preencher os campos do formulário com os dados do usuário
    document.getElementById('codigo').value = user.id;
    document.getElementById('nome').value = user.nome;
    document.getElementById('sobrenome').value = user.sobrenome;

    // Adiciona um botão para salvar as alterações
    const saveButton = document.createElement('button');
    saveButton.className = 'btn waves-effect waves-light';
    saveButton.innerText = 'Salvar';
    saveButton.onclick = async function () {
        await updateUser(id);
    };
    document.querySelector('.button-container').appendChild(saveButton);
}

async function updateUser(id) {
    const token = localStorage.getItem('token');
    const userData = {
        id: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value
    };

    const response = await fetch(`/usuario/${id}`, {
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
    window.location.href = '/usuarios';  // Redireciona para a lista de usuários após atualização
}

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "/login";
    }
}

function clearSearch() {
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.querySelector('#resultsTable tbody').innerHTML = ''; // Limpa a tabela
}
