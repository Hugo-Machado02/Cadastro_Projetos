document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = getForm(formLogin);

        loginAuth(data);
    });

    function loginAuth(dados){
        limpaFeedbacks();
        fetch('/api/login', {
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
                    toastNotification(data.error, "text-bg-danger")
                });
                return;
            }
            return window.location.href = "/"
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
    }
});