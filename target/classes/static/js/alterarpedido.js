document.addEventListener('DOMContentLoaded', function() {
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
    const tabElems = document.querySelectorAll('.tabs');
    M.Tabs.init(tabElems);
    
    document.getElementById('addRegistro').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('nome').focus();
    });

    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        const popup = document.getElementById('popup');
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    document.getElementById('produtoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const quantidade = document.getElementById('quantidade').value;
        const tamanho = document.getElementById('tamanho').value;
        const valor = document.getElementById('valor').value;
        const desconto = document.getElementById('desconto').value;
        const observacao = document.getElementById('observacao').value;

        const newRow = `<tr>
            <td>${nome}</td>
            <td>${quantidade}</td>
            <td>${tamanho}</td>
            <td>${valor}</td>
            <td>${desconto}</td>
            <td>${observacao}</td>
            <td>
                <button class="edit-btn" title="Editar">
                    <i class="material-icons">edit</i>
                </button>
                <button class="delete-btn" title="Excluir">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        </tr>`;

        document.getElementById('tabelaRegistros').insertAdjacentHTML('beforeend', newRow);
        document.getElementById('popup').style.display = 'none'; 
        document.getElementById('produtoForm').reset();
    });

    document.getElementById('tabelaRegistros').addEventListener('click', function(e) {
        if (e.target.closest('.edit-btn')) {
            const row = e.target.closest('tr');
            const cells = row.querySelectorAll('td');

            document.getElementById('nome').value = cells[0].innerText;
            document.getElementById('quantidade').value = cells[1].innerText;
            document.getElementById('tamanho').value = cells[2].innerText;
            document.getElementById('valor').value = cells[3].innerText;
            document.getElementById('desconto').value = cells[4].innerText;
            document.getElementById('observacao').value = cells[5].innerText;

            document.getElementById('popup').style.display = 'block';
            row.remove();
        }

        if (e.target.closest('.delete-btn')) {
            const row = e.target.closest('tr');
            row.remove(); 
        }
    });

    function confirmLogout(event) {
        event.preventDefault();
        const confirmed = confirm("Você deseja realmente sair da aplicação?");
        if (confirmed) {
            localStorage.clear(); // Limpa todas as informações do localStorage
            window.location.href = "/login";
        }
    }
    

    function exportPdf() {
        window.open('/export-pdf', '_blank');
    }
    
    // Função para salvar o pedido
    async function salvarPedido() {
        const id = document.getElementById("codigo").value; // Assumindo que o código é o ID do pedido
        const data = document.getElementById("data").value;
        const descrevend = document.getElementById("descrevend").value;
        const clienteNome = document.getElementById("cliente").value; // Nome do cliente
        const dataentrega = document.getElementById("dataentrega").value;
        const status = document.getElementById("status").value;
        const valortot = document.getElementById("valortot").value;
        const frete = document.getElementById("frete").value;
        const valorentrada = document.getElementById("valorentrada").value;
        const valorrestante = document.getElementById("valorrestante").value;
        const parcelas = document.getElementById("parcelas").value;
    
        // Função para pegar o token do localStorage
        const token = localStorage.getItem("token");
    
        try {
            // 1. Buscar ID do cliente pelo nome
            const clienteResponse = await fetch(`/cliente/pesquisa?nome=${encodeURIComponent(clienteNome)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!clienteResponse.ok) {
                throw new Error('Erro ao buscar cliente.');
            }
    
            const clientes = await clienteResponse.json();
            if (clientes.length === 0) {
                alert("Cliente não encontrado.");
                return;
            }
    
            const clienteId = clientes[0].id; // Considerando o primeiro cliente encontrado
    
            // 2. Criar o objeto do pedido
            const pedido = {
                data,
                descrevend,
                cliente: clienteId, // Usando ID do cliente
                dataentrega,
                status,
                valortot,
                frete,
                valorentrada,
                valorrestante,
                parcelas
            };
    
            // 3. Atualizar o pedido
            const response = await fetch(`/pedido/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedido)
            });
    
            if (response.ok) {
                const updatedPedido = await response.json();
                alert("Pedido atualizado com sucesso!");
            } else {
                throw new Error('Erro ao atualizar pedido.');
            }
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro ao atualizar o pedido.");
        }
    }    
});


