function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    console.log('Token recuperado do localStorage:', token);
    
    // Verifica se o token existe antes de tentar fazer a requisição
    if (!token) {
        alert('Token de autenticação não encontrado, faça login novamente.');
        window.location.href = '/login';
        return;
    }

    // Antes de enviar o token, vamos verificar se ele ainda é válido (opcional, mas recomendado)
    if (isTokenExpired(token)) {
        alert('Token expirado, por favor faça login novamente.');
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
    }

    fetch('/paginainicial', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Resposta da API:', response);
        if (!response.ok) {
            if (response.status === 403) {
                alert('Acesso negado. Faça login novamente.');
                window.location.href = '/login';
            }
            throw new Error('Erro ao carregar a página inicial');
        }
        return response.text(); // Utilizar response.text() para tratar HTML
    })
    .then(html => {
        console.log('HTML recebido:', html);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const newContent = tempDiv.querySelector('.content');
        if (newContent){
            document.querySelector('.content').innerHTML = newContent.innerHTML;
        } else {
            console.error('Conteúdo não encontrado na resposta HTML.');
            alert('Não foi possível carregar o conteúdo da página inicial.');
        }
    })
    .catch(error => {
        console.error('Erro ao carregar a página inicial:', error);
        alert('Erro ao carregar a página inicial. Consulte o console para mais detalhes.');
    });
});

// Função para verificar se o token expirou
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do token
        const expirationDate = payload.exp * 1000; // O valor de exp está em segundos, converte para milissegundos
        const currentDate = new Date().getTime();
        return currentDate > expirationDate; // Retorna true se o token expirou
    } catch (error){
        console.error('Erro ao verificar o token:', error);
        return true;
    }
}

// Simulação de pedidos
const pedidos = [
    { id: 1, status: "Aprovado", dataEntrega: "2024-10-15" },
    { id: 2, status: "Aprovado", dataEntrega: "2024-11-10" },
    { id: 3, status: "Aprovado", dataEntrega: "2024-10-20" },
    { id: 4, status: "Aprovado", dataEntrega: "2024-11-01" }
];

// Função para filtrar e exibir pedidos
function exibirPedidos() {
    const pedidosList = document.getElementById("pedidos-list");
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    // Limpar a lista antes de adicionar os itens
    pedidosList.innerHTML = "";

    // Filtrar pedidos dos últimos 30 dias e com status "Aprovado"
    pedidos.forEach(pedido => {
        const dataEntrega = new Date(pedido.dataEntrega);
        const ehValido = pedido.status === "Aprovado" && dataEntrega >= trintaDiasAtras && dataEntrega <= hoje;

        if (ehValido) {
            const li = document.createElement("li");
            li.textContent = `Pedido #${pedido.id} - Entrega: ${pedido.dataEntrega}`;

            // Adicionar classe "pedido-red" se a data for anterior ao dia atual
            if (dataEntrega < hoje) {
                li.classList.add("pedido-red");
            }

            pedidosList.appendChild(li);
        }
    });
}

/// Simulação de dados de vendas (produto e valor total vendido)
const vendas = [
    { produto: "Produto A", quantidade: 120, valorTotal: 5000 },
    { produto: "Produto B", quantidade: 80, valorTotal: 3000 },
    { produto: "Produto C", quantidade: 150, valorTotal: 7500 },
    { produto: "Produto D", quantidade: 50, valorTotal: 2500 },
];

// Função para criar o gráfico de pizza
function criarGraficoPizza() {
    const ctx = document.getElementById('salesPieChart').getContext('2d');

    const labels = vendas.map(venda => venda.produto); // Nomes dos produtos
    const valores = vendas.map(venda => venda.valorTotal); // Valores totais vendidos

    new Chart(ctx, {
        type: 'pie', // Tipo do gráfico (pizza)
        data: {
            labels: labels, // Produtos no gráfico
            datasets: [{
                label: 'Valor Total de Vendas',
                data: valores, // Dados de valor total vendido
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Azul
                    'rgba(255, 99, 132, 0.6)', // Vermelho
                    'rgba(75, 192, 192, 0.6)', // Verde
                    'rgba(255, 159, 64, 0.6)', // Laranja
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top', // Posição da legenda
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            // Exibe o valor total de vendas com formato monetário
                            return `${tooltipItem.label}: R$ ${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

// Simulação de transações financeiras (entradas e saídas)
const transacoes = [
    { tipo: "entrada", valor: 1000, data: "2024-11-05" },
    { tipo: "saida", valor: 500, data: "2024-11-10" },
    { tipo: "entrada", valor: 2000, data: "2024-11-15" },
    { tipo: "saida", valor: 800, data: "2024-11-20" }
];

// Função para calcular o total de entradas, saídas e saldo do mês
function calcularFinanceiro() {
    const financeiroList = document.getElementById("financeiro-list");
    const hoje = new Date();
    const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    
    let totalEntradas = 0;
    let totalSaidas = 0;

    // Limpar a lista antes de adicionar os itens
    financeiroList.innerHTML = "";

    // Filtrar transações do mês corrente
    transacoes.forEach(transacao => {
        const dataTransacao = new Date(transacao.data);
        
        if (dataTransacao >= inicioDoMes && dataTransacao <= hoje) {
            if (transacao.tipo === "entrada") {
                totalEntradas += transacao.valor;
            } else if (transacao.tipo === "saida") {
                totalSaidas += transacao.valor;
            }
        }
    });

    const saldo = totalEntradas - totalSaidas;

    // Adicionar as informações financeiras no card
    financeiroList.innerHTML = `
        <li><strong>Total de Entradas:</strong> R$ ${totalEntradas.toFixed(2)}</li>
        <li><strong>Total de Saídas:</strong> R$ ${totalSaidas.toFixed(2)}</li>
        <li><strong>Saldo do Mês:</strong> R$ ${saldo.toFixed(2)}</li>
    `;
}

// Chama a função para calcular e exibir as informações financeiras quando a página for carregada
window.onload = function() {
    exibirPedidos();      // Exibe os pedidos
    criarGraficoPizza();  // Cria o gráfico de vendas
    calcularFinanceiro(); // Calcula e exibe as informações financeiras
};