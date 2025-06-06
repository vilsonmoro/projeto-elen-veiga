document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();

    // Atrelando evento ao botão Buscar
    document.getElementById('buscarBtn').addEventListener('click', function(event) {
        event.preventDefault();

        const formaPagamento = document.getElementById('formapagamento').value;
        const dataInicial = document.getElementById('dataInicial').value;
        const dataFinal = document.getElementById('dataFinal').value;
        const feedback = document.getElementById('feedback');

        // Validar datas
        if (!dataInicial || !dataFinal) {
            alert('Por favor, preencha as datas inicial e final.');
            return;
        }

        if (new Date(dataInicial) > new Date(dataFinal)) {
            alert('A data inicial deve ser anterior ou igual à data final.');
            return;
        }

        // Salvar no localStorage conforme regra
        if (formaPagamento !== 'todas') {
            localStorage.setItem('formaPagamento', formaPagamento.toUpperCase());
        } else {
            localStorage.removeItem('formaPagamento');
        }

        localStorage.setItem('dataInicial', dataInicial);
        localStorage.setItem('dataFinal', dataFinal);

        // Redirecionar para a página fluxocaixa
        window.location.href = '/fluxocaixa';
    });
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear(); // Limpa todas as informações do localStorage
        window.location.href = "/login";
    }
}