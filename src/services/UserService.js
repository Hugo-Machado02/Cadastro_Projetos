const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");

class UserService{
    async getAllUsers(){
        return await UserRepository.getAllUser();
    }

    async addUser(data){
        if(!this.#emailValidate(data.email)){
            return {status: 422, error: "Email inválido"}
        }

        const verificaEmail = await UserRepository.getUserEmail(data.email);
        if(verificaEmail){
            return {status: 409, error: "Email já Cadastrado"}
        }

        data.password = await bcrypt.hash(data.password, 10);
        data.dataCadastro = new Date();
        data.status = true
        
        const newUser = await UserRepository.createUser(data);

        if(!newUser.sucess){
            return {status: 500, error: "Não foi possível cadastrar o Usuário"}
        }

        return {succes: true}
    }

    #emailValidate(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}

module.exports = new UserService();