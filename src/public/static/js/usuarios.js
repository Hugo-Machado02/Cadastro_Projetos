document.addEventListener('DOMContentLoaded', function() {
    getUsers()
    const formaCadUser = document.getElementById('formCadUser');
    const newUserModal = new bootstrap.Modal(document.getElementById('newUser'));
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteBtn');
    const confirmActivateModal = document.getElementById('confirmActivateModal');
    const confirmActivateButton = document.getElementById('confirmActivateBtn');
    let userIdOperation = null;

    formaCadUser.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = getForm(formaCadUser);

        apiCadastro(data, "/api/users/new", "Usuário Cadastrado com Sucesso", newUserModal);
    });

    //eventos para desativar um usuário
    confirmDeleteModal.addEventListener("show.bs.modal", (event) => {
        const UserNameDelete = document.getElementById("userNameDelete");
        const button = event.relatedTarget;

        userIdOperation = button.dataset.userId;
        const userName = button.dataset.userName;

        if (UserNameDelete) {
            UserNameDelete.textContent = userName;
        }
    });
    
    confirmDeleteButton.addEventListener("click", function() {
        validaConfirmacao(confirmDeleteModal);
    });


    //evento para Reativar um usuário
    confirmActivateModal.addEventListener("show.bs.modal", (event) => {
        const userNameSpan = document.getElementById("userNameActivate");
        const button = event.relatedTarget;

        userIdOperation = button.dataset.userId;
        const userName = button.dataset.userName;

        if (userNameSpan) {
            userNameSpan.textContent = userName;
        }
    });

    confirmActivateButton.addEventListener("click", function() {
        validaConfirmacao(confirmActivateModal);
    });

    function validaConfirmacao(modal){
        if (userIdOperation) {
            alteraStatusUsuario(userIdOperation)
        }

        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
            bsModal.hide();
        }
        userIdOperation = null;
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

    //Realiza a alteração do status do usuário
    function alteraStatusUsuario(id){
        limpaFeedbacks();
        fetch(`/api/users/updateStatus/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                response.json().then(data => {
                    toastNotification(data.error, "text-bg-danger");
                });
                return;
            }
            location.reload();
        })
        .then(data => {
           console.log("Dados enviados com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
    }
});