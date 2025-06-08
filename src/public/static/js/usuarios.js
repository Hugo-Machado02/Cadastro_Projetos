document.addEventListener('DOMContentLoaded', function() {
    getUsers()
    const formaCadUser = document.getElementById('formCadUser');
    const newUserModal = new bootstrap.Modal(document.getElementById('newUser'));

    formaCadUser.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = getForm(formaCadUser);

        cadastroUsuario(data);
    });

    //cadastro de usuários
    function cadastroUsuario(dados){
        limpaFeedbacks();
        fetch('/api/users/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                response.json().then(data => {
                    if(response.status == 400){
                        return addInvalidInput(data);
                    }
                    toastNotification(data.error, "text-bg-danger");
                });
                return;
            }
            newUserModal.hide();
            toastNotification("Usuário Cadastrado com Sucesso", "text-bg-success");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
        .then(data => {
           console.log("Dados enviados com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
    }

    //listagem de usuários
    function getUsers(){
        fetch('/api/users/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                console.log(`Erro HTTP: ${response.status} ${response.statusText}`)
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                addUsersTable(data);
            } else {
                console.warn('Resposta da API não é um array de usuários:', data);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar ou processar dados de usuários:', error);
        });
        }

    //Adiciona usuários na tabela
    function addUsersTable(users) {
        const tableUsers = document.querySelector('#userTable tbody');
        tableUsers.innerHTML = '';

        const old = tableUsers._clickListener;
        if (old) {
            tableUsers.removeEventListener('click', old);
        }

        const handleRowClick = (event) => {
            const rowClick = event.target.closest('tr');

            if (rowClick && rowClick.dataset.userId) {
                const userId = rowClick.dataset.userId;
                window.location.href = `/usuarios/${userId}`;
            }
        };

        tableUsers.addEventListener('click', handleRowClick);
        tableUsers._clickListener = handleRowClick;

        users.forEach(user => {
            const row = tableUsers.insertRow();

            const rowName = row.insertCell();
            rowName.textContent = user.name;

            const rowEmail = row.insertCell();
            rowEmail.textContent = user.email;

            const rowDataCadastro = row.insertCell();
            rowDataCadastro.textContent = formatDate(user.dataCadastro)

            row.dataset.userId = user.id;

            const rowButton = row.insertCell();
            
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-user-id', user.id);
            button.setAttribute('data-user-name', user.name);
            
            if(user.status == 1){
                button.classList.add('btn', 'btn-sm', 'btn-danger');
                button.setAttribute('data-bs-target', '#confirmDeleteModal');
                button.innerHTML = `<span class="material-icons-round" style="font-size: 1.1rem;">person_off</span>`;
            } else{
                row.classList.add("table-danger")
                button.classList.add('btn', 'btn-sm', 'btn-primary');
                button.setAttribute('data-bs-target', '#confirmActivateModal');
                button.innerHTML = `<span class="material-icons-round" style="font-size: 1.1rem;">person</span>`;
            }

            button.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            rowButton.appendChild(button);
        });
    }
});