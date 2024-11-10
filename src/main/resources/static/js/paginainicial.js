function confirmLogout(event) {
			event.preventDefault();
			const confirmed = confirm("Você deseja realmente sair da aplicação?");
			if (confirmed) {
				window.location.href = "login.html";
			}
		}

document.addEventListener('DOMContentLoaded', function () {
	const token = localStorage.getItem('jwtToken');
	if (!token) {
		alert('Token de autenticação não encontrado, faça login novamente.');
		window.location.href = '/login'; // URL da página de login
		return;
	}
	fetch('/pagina_inicial', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	.then(response => {
		if (!response.ok) {
			if (response.status === 403) {
				alert('Acesso negado. Faça login novamente.');
				window.location.href = '/login';
			}
			throw new Error('Erro ao carregar a página inicial');
		}
		return response.json();
	})
	.then(data => {
		document.getElementById('content').innerText = JSON.stringify(data);
	})
	.catch(error => {
		console.error('Erro:', error);
		alert('Erro ao carregar a página inicial. Consulte o console para mais detalhes.');
	});
});