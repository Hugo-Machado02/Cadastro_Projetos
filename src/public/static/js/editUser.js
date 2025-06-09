document.addEventListener('DOMContentLoaded', function() {
    const userId = capturaID();
    getUsers()
    const formEditUser = document.getElementById('formEditUser');
    
    formEditUser.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = getForm(formEditUser);
        apiUpdate(`/api/users/update/${userId}`, data, "Usuário Alterado com Sucesso", "/usuarios")
    });

    //================================= Funções =================================
    function capturaID(){
        const url = window.location.pathname;
        const urlSplit = url.split('/');
        return urlSplit[urlSplit.length - 1];
    }

    function insereElementos(data){
        const inputName = document.getElementById("name");
        const inputEmail = document.getElementById("email");

        inputName.value = data.name
        inputEmail.value = data.email
    }

    //========================== Operações com as APIs ==========================
    //Busca usuário para edição
    function getUsers(){
        fetch(`/api/users/${userId}`, {
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
});