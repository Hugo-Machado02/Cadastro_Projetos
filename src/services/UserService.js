const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");

class UserService{
    async getAllUsers(){
        return await UserRepository.getAllUser();
    }

    async getUsersActive(){
        return await UserRepository.getUserActive()
    }

    async getUserId(id){
        return await UserRepository.getUserId(id);
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

        if(!newUser.success){
            return {status: 500, error: "Não foi possível cadastrar o Usuário"}
        }

        return {success: true}
    }

    async updateUser(id, data){
        const dataUpdate = {}

        const userValidation = await UserRepository.getUserId(id);
        if(!userValidation){
            return {status: 404, error: "Usuário não encontrado"}
        }

        if (data.name && data.name != userValidation.name){
            dataUpdate.name = data.name;
        }

        if (data.email && data.email != userValidation.email){
            if(!this.#emailValidate(data.email)){
                return {status: 422, error: "Email inválido"}
            }
            else{
                const emailVerify = await UserRepository.getUserEmail(data.email);
                if(emailVerify){
                    return {status: 409, error: "Email já Cadastrado"}
                }
                else{
                    dataUpdate.email = data.email;
                }
            }
        }

        if(data.password){
            const validPassword = await bcrypt.compare(data.password, userValidation.password)
            if(validPassword){
                return {status: 500, error: "A senha não pode ser igual a anterior"}
            }
            else{
                dataUpdate.password = await bcrypt.hash(data.password, 10);
            }
        }

        if(Object.keys(dataUpdate).length > 0){
            const result = await UserRepository.updateUser(id, dataUpdate);

            if(!result.success){
                return {status: 500, error: "Não foi possível cadastrar o Usuário"}
            }
            return {success: true}
        }
        return {status: 500, error: "Dados iguais! Sem necessidade de alteração"}
    }

    async updateUserStatus(id){
        const dataUpdate = {}
        const user = await UserRepository.getUserId(id);
        if(!user){
            return {status: 404, error: "Usuário não encontrado"}
        }

        if(user.status == true){
            dataUpdate.status = false;
        }
        else{
            dataUpdate.status = true;
        }

        const result = await UserRepository.updateUser(id, dataUpdate)

        if(!result.success){
            return {status: 500, error: "Não foi possível cadastrar o Usuário"}
        }
        return {success: true}
    }

    #emailValidate(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}

module.exports = new UserService();