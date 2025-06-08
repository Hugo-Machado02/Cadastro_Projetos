$(document).ready(function() {
    $('#newUser').on('shown.bs.modal', function () {
        $('#managerId').select2({
            placeholder: "Pesquise um usuário",
            allowClear: true,
            minimumInputLength: 1,
            dropdownParent: $('#newUser'),
            // NOVO: Adicione esta linha para usar o tema Bootstrap
            theme: "bootstrap-5"
        });
    });

    // Se você tiver outras inicializações Select2 fora do modal,
    // aplique o tema nelas também, se desejar que elas tenham o mesmo estilo.
    // Exemplo:
    // $('#algumOutroSelect').select2({
    //     theme: "bootstrap-5"
    // });
});


document.addEventListener('DOMContentLoaded', function() {
    getUsers()
    const formacadProject = document.getElementById('formCadProjeto');
    const newProjectModal = new bootstrap.Modal(document.getElementById('newProject'));

    formacadProject.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = getForm(formacadProject);

        cadastroUsuario(data);
    });

    //cadastro de usuários
    function cadastroUsuario(dados){
        limpaFeedbacks();
        fetch('/api/projetos/new', {
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
            newProjectModal.hide();
            toastNotification("Projeto Cadastrado com Sucesso", "text-bg-success");
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
        fetch('/api/projetos/getProjetos', {
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
                addProjectTable(data);
            } else {
                console.warn('Resposta da API não é um array de usuários:', data);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar ou processar dados de usuários:', error);
        });
        }

    //Adiciona usuários na tabela
    function addProjectTable(projects) {
        const tableProjects = document.querySelector('#userTable tbody');
        tableProjects.innerHTML = '';

        const old = tableProjects._clickListener;
        if (old) {
            tableProjects.removeEventListener('click', old);
        }

        const handleRowClick = (event) => {
            const rowClick = event.target.closest('tr');

            if (rowClick && rowClick.dataset.projectId) {
                const projectId = rowClick.dataset.projectId;
                window.location.href = `/projetos/${projectId}`;
            }
        };

        tableProjects.addEventListener('click', handleRowClick);
        tableProjects._clickListener = handleRowClick;

        projects.forEach(project => {
            const row = tableProjects.insertRow();

            const rowName = row.insertCell();
            rowName.textContent = project.name;

            const rowStartDate = row.insertCell();
            rowStartDate.textContent = formatDate(project.startDate)

            const rowEndDate = row.insertCell();
            rowEndDate.textContent = formatDate(project.endDate)

            const rowManager = row.insertCell();
            rowManager.textContent = project.managerId

            row.dataset.projectId = project.id;
        });
    }
});