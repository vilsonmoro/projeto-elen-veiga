function confirmLogout(event) {
            event.preventDefault();
            const confirmed = confirm("Você deseja realmente sair da aplicação?");
            if (confirmed) {
                window.location.href = "login.html";
            }
        }
		
		document.querySelector('.btn').addEventListener('click', function(e) {
			const usuario = document.getElementById('usuario').value;

			if (usuario.length < 3 || usuario.length > 25) {
				alert('O usuário deve ter entre 3 e 25 caracteres.');
				e.preventDefault();
				return;
			}

			if (usuario.includes(' ')) {
				alert('O usuário não pode conter espaços.');
				e.preventDefault();
			}
		});
		
		document.querySelector('.btn').addEventListener('click', function(e) {
			const email = document.getElementById('email').value;
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (!emailPattern.test(email)) {
				alert('Por favor, insira um e-mail válido.');
				e.preventDefault();
			}
		});
		document.querySelector('.btn').addEventListener('click', function(e) {
			const senha = document.getElementById('senha').value;
			const senhaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

			if (!senhaPattern.test(senha)) {
				alert('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e ter no mínimo 8 caracteres.');
				e.preventDefault();
			}
		});

		function togglePasswordVisibility(inputId) {
			const input = document.getElementById(inputId);
			const eyeIcon = input.nextElementSibling.querySelector('.material-icons');

			if (input.type === 'password') {
				input.type = 'text';
				eyeIcon.textContent = 'visibility';
			} else {
				input.type = 'password';
				eyeIcon.textContent = 'visibility_off';
			}
		}
		document.querySelector('.btn').addEventListener('click', function(e) {
			const senha = document.getElementById('senha').value;
			const confirmarSenha = document.getElementById('confirmar-senha').value;
			const senhaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

			if (!senhaPattern.test(senha)) {
				alert('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e ter no mínimo 8 caracteres.');
				e.preventDefault();
			}

			if (senha !== confirmarSenha) {
				alert('As senhas não coincidem.');
				e.preventDefault();
			}
		});