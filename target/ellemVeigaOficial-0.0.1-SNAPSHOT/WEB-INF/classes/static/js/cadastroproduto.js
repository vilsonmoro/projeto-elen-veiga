document.getElementById('cadastrarBtn').addEventListener('click', function() {
    const confirmed = confirm("Você deseja realmente cadastrar?");
    if (confirmed) {
        this.style.backgroundColor = '#FFE100';

        // Coletar os dados dos campos do formulário
        const produto = {
            codigo: document.getElementById('codigo').value,
            nome: document.getElementById('nome').value,
            peso: document.getElementById('peso').value,
            modelagem: document.getElementById('modelagem').value,
            desenvolvimento: document.getElementById('desenvolvimento').value,
            corte: document.getElementById('corte').value,
            malha: document.getElementById('malha').value,
            costura: document.getElementById('costura').value,
            etqmarca: document.getElementById('etqmarca').value,
            etqcomp: document.getElementById('etqcomp').value,
            tag: document.getElementById('tag').value,
            refil: document.getElementById('refil').value,
            elastico: document.getElementById('elastico').value,
            saco: document.getElementById('saco').value,
            fita: document.getElementById('fita').value,
            embalagem: document.getElementById('embalagem').value,
            deslocamento: document.getElementById('deslocamento').value,
            custo: document.getElementById('custo').value,
            precototal: document.getElementById('precofinal').value,
            valorsite: document.getElementById('valorsite').value,
            valorvenda: document.getElementById('valorvenda').value
        };

        // Obter o token do local storage
        const token = localStorage.getItem('token');

        // Fazer a requisição para a API
        fetch('/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
            },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar produto');
            }
            return response.json();
        })
        .then(data => {
            alert('Produto cadastrado com sucesso!');
            // Aqui você pode redirecionar ou limpar o formulário, se necessário
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um problema ao cadastrar o produto.');
        });
    } else {
        this.style.backgroundColor = ''; // Resetando a cor do botão se não confirmado
    }
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
  }