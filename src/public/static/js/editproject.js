document.addEventListener('DOMContentLoaded', function() {
    const projectId = capturaID();
    let managerId = ""
    getproject()
    const formEditProject = document.getElementById('formEditProject');
    
    formEditProject.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = getForm(formEditProject);
        apiUpdate(`/api/projects/update/${projectId}`, data,  "Projeto Alterado com Sucesso", "/projetos")
    });

    //================================= Funções =================================
    function capturaID(){
        const url = window.location.pathname;
        const urlSplit = url.split('/');
        return urlSplit[urlSplit.length - 1];
    }

    function insereElementos(data){
        const inputName = document.getElementById("name");
        const inputStartDate = document.getElementById("startDate");
        const inputEndDate = document.getElementById("endDate");

        inputName.value = data.name
        managerId = data.managerId
        inputStartDate.value = data.startDate.split('T')[0];
        inputEndDate.value = data.endDate.split('T')[0];
        getUsers()
    }


    //========================== Operações com as APIs ==========================
    //Busca usuário para edição
    function getproject(){
        fetch(`/api/projects/${projectId}`, {
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
            insereElementos(data)
        })
        .catch(error => {
            console.error('Erro ao buscar ou processar dados de usuários:', error);
        });
    }

    //Busca usuários para a seleção do gerente
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
            const option = new Option(user.name, user.id);

            if(user.id == managerId){
                option.selected = true
            }

            selectMenager.add(option)
        });
    }
});