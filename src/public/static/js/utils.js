function getForm(form){
    const data = new FormData(form);

    const objetoFormulario = {};
    for (const [key, value] of data.entries()) {
        objetoFormulario[key] = value;
    }

    return objetoFormulario;
}

function logout(){
    fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
    });
}

function toastNotification(message, type) {
    const toastBody = document.getElementById('mensageErrorNotification');
    if (toastBody) {
        toastBody.textContent = message;
    }

    const errorToastNotify = document.getElementById("toastNotification");
    errorToastNotify.classList.add(type);

    if (errorToastNotify) {
        const toast = new bootstrap.Toast(errorToastNotify, {delay: 3000});
        toast.show();
        
        errorToastNotify.addEventListener('hidden.bs.toast', function () {
            errorToastNotify.classList.remove(type);
        }, { once: true });
    } else {
        alert("Elemento toastMsg não encontrado.");
    }
}

function addInvalidInput(errors){
    for (const [keyInput, value] of Object.entries(errors)) {
        const inputElement = document.getElementById(keyInput);
        
        if (inputElement) {
            inputElement.classList.add('is-invalid');
            const errorDiv = document.getElementById(`error-${keyInput}`);
            if (errorDiv) {
                errorDiv.textContent = value.error;
            }
        }
    }
}

//Limpa as validações do input
function limpaFeedbacks() {
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(div => {
        div.textContent = '';
    });
}

function formatDate(date){
    const objDate = new Date(date);
    return objDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' });
}

function apiCadastro(dados, api, msg, modal){
    limpaFeedbacks();
    fetch(api, {
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
        modal.hide();
        toastNotification(msg, "text-bg-success");
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

//API para Alterações
function apiUpdate(api, dados, msg, rota){
    limpaFeedbacks();
    fetch(api, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            response.json().then(data => {
                console.log(response.status)
                console.log(response.status)
                if(response.status == 400){
                    console.log(data.error)
                    return addInvalidInput(data);
                }
                toastNotification(data.error, "text-bg-danger");
            });
            return;
        }
        toastNotification(msg, "text-bg-success");
        setTimeout(() => {
            window.location.href = rota;
        }, 1000);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
    });
}