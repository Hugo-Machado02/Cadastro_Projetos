document.addEventListener('DOMContentLoaded', function() {
    getProjects()
    getUsers()
    const formacadProject = document.getElementById('formCadProjeto');
    const newProjectModal = new bootstrap.Modal(document.getElementById('newProject'));
    const projectDeleteModal = document.getElementById('projectDeleteModal');
    const projectDeleteBtn = document.getElementById('projectDeleteBtn');
    let projectId = ""

    formacadProject.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = getForm(formacadProject);

        apiCadastro(data, "/api/projetos/new", "Projeto Cadastrado com Sucesso", newProjectModal);
    });

    projectDeleteModal.addEventListener("show.bs.modal", (event) => {
        const titleProjectSpan = document.getElementById("titleProject");
        const button = event.relatedTarget;

        projectId = button.dataset.projectId;
        const userName = button.dataset.projectName;

        if (titleProjectSpan) {
            titleProjectSpan.textContent = userName;
        }
    });
    
    projectDeleteBtn.addEventListener("click", function() {
        if (projectId) {
            deletaProjetos(projectId)
        }

        const bsModal = bootstrap.Modal.getInstance(projectDeleteModal);
        if (bsModal) {
            bsModal.hide();
        }
        projectId = null;
    });

    //listagem de Projetos
    function getProjects(){
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

    //Busca usuários para a seleção do gerente
    function getUsers(){
        fetch('/api/users/getUsersActive', {
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
                insereMaganersSelect(data);
            } else {
                console.warn('Resposta da API não é um array de usuários:', data);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar ou processar dados de usuários:', error);
        });
    }


    //Busca os usuários para seleção de gerentes
    function insereMaganersSelect(users){
        const selectMenager = document.getElementById("managerId");
        
        users.forEach(user => {
            const option = new Option(user.name, user.id)
            selectMenager.add(option)
            console.log(`${user.name}, ${user.id}`)
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

            const rowButton = row.insertCell();

            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-project-id', project.id);
            button.setAttribute('data-project-name', project.name);
            
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.setAttribute('data-bs-target', '#projectDeleteModal');
            button.innerHTML = `<span class="material-icons-round" style="font-size: 1.1rem;">delete</span>`;

            button.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            rowButton.appendChild(button);
        });
    }


    //API para Cadastro
    function deletaProjetos(id){
        limpaFeedbacks();
        fetch(`/api/projetos/delete/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
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

$(document).ready(function() {
    $('#newProject').on('shown.bs.modal', function () {
        $('#managerId').select2({
            placeholder: "Pesquise um usuário",
            allowClear: true,
            minimumInputLength: 1,
            dropdownParent: $('#newProject'),
            theme: "bootstrap-5"
        });
    });
});