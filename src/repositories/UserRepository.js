const UserModel = require("../models/UserModel");

class UserRepository{
    async createUser(user){
        try {
            await UserModel.create(user);
            return {success: true}
        } catch (err) {
            return {success: false, error: err};
        }
    }

    async getUserId (id) {
        try {
            return await UserModel.findByPk(id)
        } catch (err) {
            return {success: false, error: err};
        }
    }

    async getUserEmail (email) {
        try {
            return await UserModel.findOne({ where: { email: email } })
        } catch (err) {
            return {success: false, error: err};
        }
    }

    async getAllUser() {
        try {
            return await UserModel.findAll({ order: [['status', 'DESC'], ['name', 'ASC']] });
        } catch (err) {
            return { success: false, error: err };
        }
    }
    
    async getUserActive() {
        try {
            return await UserModel.findAll({ where: { status: true }, order: [['name', 'ASC']] });
        } catch (err) {
            return { success: false, error: err };
        }
    }

    async updateUser(id, dataUpdate){
        try {
            await UserModel.update(dataUpdate, { where: { id: id } });
            return {success: true}
        } catch (err) {
            return {success: false, error: err};
        }
    }
}

module.exports = new UserRepository();