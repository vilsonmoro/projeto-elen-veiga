document.addEventListener('DOMContentLoaded', function() {
			const elems = document.querySelectorAll('select');
			const instances = M.FormSelect.init(elems);
		});


        function confirmLogout(event) {
            event.preventDefault();
            const confirmed = confirm("Você deseja realmente sair da aplicação?");
            if (confirmed) {
                window.location.href = "login.html";
            }
        }

        document.querySelector('.btn').addEventListener('click', function(e) {
            const desconto = document.getElementById('desconto').value;
            const email = document.getElementById('email').value;
			const observacoes = document.getElementById('observacoes').value;

            if (desconto < 0 || desconto > 100) {
                alert('O desconto deve ser um valor entre 0 e 100.');
                e.preventDefault(); 
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                e.preventDefault();
            }

			if (observacoes.length > 250) {
				alert('As observações devem ter no máximo 250 caracteres.');
				e.preventDefault();
			}
        });