const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");

class LoginService{
    async login(email, password){

        if(!this.#emailValidate(email)){
            return {status: 422, error: "Email inválido"}
        }

        const verificaEmail = await UserRepository.getUserEmail(email);

        if(!verificaEmail){
            return {status: 401, error: "E-mail ou senha incorretos"};
        }

        const validaPassword = await bcrypt.compare(password, verificaEmail.password)
        if(!validaPassword){
            return {status: 401, error: "E-mail ou senha incorretos"}
        }
        
        const user = {
            id: verificaEmail.id,
            name: verificaEmail.name,
            email: verificaEmail.email
        }

        return {succes: true, user: user}
    }

    #emailValidate(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}

module.exports = new LoginService();