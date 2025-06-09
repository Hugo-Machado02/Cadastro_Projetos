document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const btnPassword = document.getElementById('visualizacaoLogin');
    const savedEmail = getCookie('rememberedEmail');

    verificaCheck()

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = getForm(formLogin);

        loginAuth(data);
    });

    btnPassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            btnPassword.textContent = 'visibility_off';
        } else {
            passwordInput.type = 'password';
            btnPassword.textContent = 'visibility';
        }
    });

    function verificaCheck(){
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberMeCheckbox.checked = true;
        }
    }

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
            if (dados.rememberMe) {
                setCookie('rememberedEmail', dados.email, 30);
            } else {
                eraseCookie('rememberedEmail');
            }
            return window.location.href = "/"
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
    }

    function setCookie(name, value, days) {
        let expiration = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expiration = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expiration + "; path=/; SameSite=Lax";
    }

    function getCookie(email) {
        const getEmail = email + "=";
        const cookie = document.cookie.split(';');
        for(let i=0; i < cookie.length; i++) {
            let emailCookie = cookie[i];
            while (emailCookie.charAt(0) === ' ') emailCookie = emailCookie.substring(1, emailCookie.length);
            if (emailCookie.indexOf(getEmail) === 0) return emailCookie.substring(getEmail.length, emailCookie.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/;';
    }

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = getForm(formLogin);

        loginAuth(data);
    });

});