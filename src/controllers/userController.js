const UserService = require("../services/UserService");

module.exports = {
    getAllUsers: async (req, res) => {
    const users = await UserService.getAllUsers();
    if (!users || users.length === 0) {
        return res.status(204).send();
    }
    
    return res.status(200).json(users);
    },

    addUser: async (req, res) => {
        const {passwordConfirm, ...data} = req.body;
        const errors = {};

        if (!data.name) {
            errors.name = {error: "Nome não preenchido"};
        }
        if (!data.email) {
            errors.email = {error: "Email não preenchido"};
        }
        if (!data.password) {
            errors.password = {error: "Senha não preenchida"};
        }
        if (!passwordConfirm) {
            errors.passwordConfirm = {error: "Confirmação de Senha não preenchida"};
        }

        if(data.password != passwordConfirm){
            errors.validPasswords = {error: "As Senhas não conferem"};
        }


        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        const newUser = await UserService.addUser(data);
        if(newUser.succes){
            return res.status(201).json({ newUser })
        }
        return res.status(newUser.status).json({ error: newUser.error })
    },

    update: async (req, res) => {
        const { id, name, email, password } = req.body;
        if (id && name && email && password) {
            const resultUpdate = await userModel.updateUser(req.body);
            if (resultUpdate) {
                res.json({ status: 200, data: "Alteração realizada com Sucesso" });
            } else {
                res.json({ status: 500, data: "Erro ao realizar a alteração" });
            }
        } else {
            res.json({ status: 500, data: "Dados Faltando" });
        }
    },
};
