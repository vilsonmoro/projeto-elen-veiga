document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('addRegistro');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const selectElems = document.querySelectorAll('select');
    const tabElems = document.querySelectorAll('.tabs');

    M.FormSelect.init(selectElems);

    M.Tabs.init(tabElems);

    addBtn.addEventListener('click', function () {
        popup.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear();
        window.location.href = "/login";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setupAutocomplete("cliente", "../cliente/buscar", "cliente-suggestions", "nome");
    setupAutocomplete("pedido", "../pedido", "pedido-suggestions", "id", true);
    setupAutocomplete("vendedor", "../vendedor/buscar", "vendedor-suggestions", "nome");
  });
  
  function setupAutocomplete(inputId, url, suggestionId, displayKey, isIdSearch = false) {
    const input = document.getElementById(inputId);
    const suggestionBox = document.getElementById(suggestionId);

    // Mostra as sugestões quando o campo recebe foco
    input.addEventListener("focus", () => {
        suggestionBox.style.display = 'block';  // Mostra as sugestões
    });

    // Esconde as sugestões quando o campo perde o foco (com um pequeno atraso)
    input.addEventListener("blur", () => {
        setTimeout(() => { 
            suggestionBox.style.display = 'none';  // Esconde as sugestões
        }, 200);
    });

    // Quando o usuário digita, as sugestões são atualizadas
    input.addEventListener("input", async () => {
        const query = input.value.trim();

        if (query.length === 0) {
            suggestionBox.innerHTML = "";
            suggestionBox.style.display = 'none';  // Esconde as sugestões se o campo estiver vazio
            return;
        }

        let endpoint = url;
        if (isIdSearch) {
            endpoint += `/${query}`;
        } else {
            endpoint += `?nome=${encodeURIComponent(query)}`;
        }

        try {
            const res = await fetch(endpoint);
            let data = await res.json();

            if (!Array.isArray(data)) {
                data = [data];  // Trata retorno de pedido por ID
            }

            const top5 = data.slice(0, 5);

            suggestionBox.innerHTML = top5.map(item =>
                `<div data-id="${item.id}">${item[displayKey]}</div>`
            ).join("");

            suggestionBox.style.display = 'block';  // Mostra as sugestões se houver resultados

            suggestionBox.querySelectorAll("div").forEach(div => {
                div.addEventListener("click", () => {
                    input.value = div.textContent;
                    localStorage.setItem(`venda_${inputId}_id`, div.dataset.id);
                    suggestionBox.innerHTML = "";
                    suggestionBox.style.display = 'none';  // Esconde as sugestões após seleção
                });
            });

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    });
}



//Função para preencher a tabela de produtos com os produtos do pedidoproduto

//Função para preencher o campo "valor total" com a soma do valor unitário * quantidade

//Função para preencher a forma de pagamento com a forma de pagamento do cliente

//Função para preencher a comissão com o valor de 10% do valor total

//Função para criar ProdutoVenda

//Função para criar a Venda

  






// Função para buscar cliente
async function buscarCliente() {
    const response = await fetch('/cliente');
    return await response.json();
}

// Função para buscar pedido
async function buscarPedido() {
    const response = await fetch('/pedido');
    return await response.json();
}

// Função para buscar produtos pelo nome
async function buscarProdutos(nomeProduto) {
    const response = await fetch(`/search?nomeProduto=${encodeURIComponent(nomeProduto)}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
    }
    return await response.json();
}

// Função para cadastrar venda
async function cadastrarVenda() {
    const cliente = document.getElementById('cliente').value;
    const pedido = document.getElementById('pedido').value;
    const data = document.getElementById('data').value;
    const observacao = document.getElementById('observacao').value;
    const valortot = document.getElementById('valortot').value;
    const vendedor = document.getElementById('vendedor').value;
    const comissao = document.getElementById('comissao').value;

    const token = localStorage.getItem('token'); // Recuperando o token do localStorage

    const vendaData = {
        cliente,
        pedido,
        data,
        observacao,
        valortot,
        vendedor,
        comissao
    };

    const vendaResponse = await fetch('/venda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vendaData)
    });

    const venda = await vendaResponse.json();

    // Agora registrar os itens da venda
    await cadastrarProdutoVenda(venda.id);
}

// Função para cadastrar produto venda
async function cadastrarProdutoVenda(vendaId) {
    const rows = document.querySelectorAll('#tabelaRegistros tr');

    const produtosVenda = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const produto = {
            vendaId,
            nome: cells[0].innerText,
            quantidade: cells[1].innerText,
            tamanho: cells[2].innerText,
            valor: cells[3].innerText,
            desconto: cells[4].innerText,
            observacao: cells[5].innerText
        };
        produtosVenda.push(produto);
    });

    const token = localStorage.getItem('token'); // Recuperando o token do localStorage

    await Promise.all(produtosVenda.map(produto => {
        return fetch('/produtovenda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(produto)
        });
    }));
}

document.getElementById('cadastrarBtn').addEventListener('click', async function () {
    const nomeProduto = document.getElementById('produto').value; // Supondo que você tenha um campo para o nome do produto
    const produtos = await buscarProdutos(nomeProduto); // Busca produtos antes de cadastrar a venda

    if (produtos.length === 0) {
        alert('Nenhum produto encontrado com esse nome.');
        return; // Interrompe o cadastro se não encontrar produtos
    }

    const confirmed = confirm("Você deseja realmente cadastrar?");
    if (confirmed) {
        await cadastrarVenda();
        alert("Venda cadastrada com sucesso!");
    }
});

// Função para preencher campos de cliente e pedido
async function preencherCliente() {
    const clientes = await buscarCliente();
    // Implementar lógica para mostrar os clientes em um dropdown ou autocomplete
}

async function preencherPedido() {
    const pedidos = await buscarPedido();
    // Implementar lógica para mostrar os pedidos em um dropdown ou autocomplete
}

document.getElementById('cliente').addEventListener('focus', preencherCliente);
document.getElementById('pedido').addEventListener('focus', preencherPedido);
