const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");

class LoginService{
    async login(email, password){

        if(!this.#emailValidate(email)){
            return {status: 422, error: "Email inválido"}
        }

        const userValidation = await UserRepository.getUserEmail(email);

        if(!userValidation){
            return {status: 401, error: "E-mail ou senha incorretos"};
        }

        if(!userValidation.status){
            return {status: 401, error: "Usuário Inativo no Sistema!"};
        }

        const validaPassword = await bcrypt.compare(password, userValidation.password)
        if(!validaPassword){
            return {status: 401, error: "E-mail ou senha incorretos"}
        }
        
        const user = {
            id: userValidation.id,
            name: userValidation.name,
            email: userValidation.email
        }

        return {success: true, user: user}
    }

    #emailValidate(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}

module.exports = new LoginService();