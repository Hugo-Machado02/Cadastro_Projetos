const UserService = require("../services/UserService");

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await UserService.getAllUsers();
        if (!users || users.length === 0) {
            return res.status(204).send();
        }
        return res.status(200).json(users);
    },

    getUsersActive: async (req, res) => {
        const users = await UserService.getUsersActive();
        if (!users || users.length === 0) {
            return res.status(204).send();
        }
        return res.status(200).json(users);
    },

    getUserId: async (req, res) => {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({error: "ID sem valor"});
        }

        const userId = await UserService.getUserId(id);

        if (!userId || userId.length === 0) {
        return res.status(204).send();
        }
        return res.status(200).json(userId);
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
            errors.passwordConfirm = {error: "As Senhas não corresponde"};
        }


        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        const newUser = await UserService.addUser(data);
        if(newUser.success){
            return res.status(201).json({ newUser })
        }
        return res.status(newUser.status).json({ error: newUser.error })
    },

    updateUser: async (req, res) => {
        const {id} = req.params;
        const data = req.body;
        const dataEnvio = {};
        const errors = {};        

        if(data.name){
            dataEnvio.name = data.name;
        }

        if(data.email){
            dataEnvio.email = data.email.toLowerCase();
        }

        if(data.password && !data.passwordConfirm){
            errors.passwordConfirm = {error: "Confirmação de Senha não preenchida"};
        }

        if(data.passwordConfirm && !data.password ){
            errors.password = {error: "Senha não preenchida"};
        }

        if(data.password && data.passwordConfirm){
            if(data.password != data.passwordConfirm){
                errors.passwordConfirm = {error: "As senhas não correspondem"};
            }
            else{
                dataEnvio.password = data.password;
            }
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        const updateUser = await UserService.updateUser(id, dataEnvio)

        if(updateUser.success){
            return res.status(200).json({ updateUser })
        }
        return res.status(updateUser.status).json({ error: updateUser.error })

    },

    updateStatus: async (req, res) => {
        const {id} = req.params;

        const updateUser = await UserService.updateUserStatus(id);
        if(!updateUser.success){
            return res.status(updateUser.status).json({ error: updateUser.error })  
        }
        return res.status(200).json({ success: true })
    },
};
