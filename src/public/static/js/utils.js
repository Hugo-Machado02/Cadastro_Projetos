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
// export function showToast(message, type = 'light') {
//     const toastElement = document.getElementById('toastMsg');
//     if (!toastElement) {
//         console.error("Elemento 'toastMsg' não encontrado. O toast não pode ser exibido.");
//         return;
//     }
//     const toastBody = toastElement.querySelector('.toast-body');

//     toastElement.className = 'toast align-items-center border-0';

//     if (type === 'error') {
//         toastElement.classList.add('text-bg-warning-subtle');
//         toastBody.classList.add('text-dark');
//     } else if (type === 'success') {
//         toastElement.classList.add('text-bg-success-subtle');
//         toastBody.classList.add('text-dark');
//     } else {
//         toastElement.classList.add(`text-bg-${type}`);
//         toastBody.classList.remove('text-dark');
//     }

//     toastBody.textContent = message;
//     const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
//     toast.show();
// }

// // Abre o Modal de Erro
// export function showErrorModal(message) {
//     const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
//     const errorModalBody = document.getElementById('errorModalBody');
//     if (errorModalBody) {
//         errorModalBody.textContent = message;
//     } else {
//         console.error("Elemento 'errorModalBody' não encontrado. O modal de erro não pode exibir a mensagem.");
//     }
//     errorModal.show();
// }


// // Exibe os erros de validação retornados pelo Back
// export function displayValidationErrors(errors) {
//     let generalErrorsMessages = [];

//     for (const [key, value] of Object.entries(errors)) {
//         const inputElement = document.getElementById(key);
//         if (inputElement) {
            
//             inputElement.classList.add('is-invalid');
//             const errorDiv = document.getElementById(`error-${key}`);
//             if (errorDiv) {
//                 errorDiv.textContent = value.error;
//             }
//         } else {
//             generalErrorsMessages.push(value.error || 'Erro desconhecido.');
//         }
//     }

//     // Exibe erros gerais no modal de erro
//     if (generalErrorsMessages.length > 0) {
//         showErrorModal(generalErrorsMessages.join('\n'));
//     }
// }