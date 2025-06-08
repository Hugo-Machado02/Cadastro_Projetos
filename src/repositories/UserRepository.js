const UserModel = require("../models/UserModel");

class UserRepository{
    async createUser(user){
        try {
            await UserModel.create(user);
            return {sucess: true}
        } catch (err) {
            return {sucess: false, error: err};
        }
    }

    async getUserId (id) {
        try {
            return await UserModel.findByPk(id)
        } catch (err) {
            return {error: err};
        }
    }

    async getUserEmail (email) {
        try {
            return await UserModel.findOne({ where: { email: email } })
        } catch (err) {
            return {error: err};
        }
    }

    async getAllUser() {
        try {
            return await UserModel.findAll({ order: [['status', 'DESC'], ['name', 'ASC']] });
        } catch (err) {
            return { error: err };
        }
    }

    async updateUser(id, dataUpdate){
        try {
            const [userUpdate] = await UserModel.update(dataUpdate, { where: { id: id } });
            return userUpdate === 1;
        } catch (err) {
            return {error: err};
        }
    }
}

module.exports = new UserRepository();