const connectionDb = require("../db/connection");
const UserModel = require("../models/UserModel");

class UserRepository{
    async createUser(user){
        try {
            const db = await connectionDb();
            const { name, email, password } = user;
            const result = await db.run(
                "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
                [name, email, password]
            );
            return {sucess: true};
        } catch (err) {
            return {sucess: false, error: err};
        }
    }

    async getUserId (id) {
        try {
            const db = await connectionDb();
            const row = db.get("SELECT id, name, email FROM user WHERE id = ?", [id]);
            if(row){
                return new UserModel(row.id, row.name, row.email, row.password);
            }
            return null;
        } catch (err) {
            return {error: err};
        }
    }

    async getUserEmail (email) {
        try {
            const db = await connectionDb();
            const row = db.get("SELECT email FROM user WHERE email = ?", [email]);
            return row;
        } catch (err) {
            return {error: err};
        }
    }

    async getAllUser() {
        try {
            const db = await connectionDb();
            const rows = await db.all("SELECT * FROM user");
            return rows.map(row => new UserModel(row.id, row.name, row.email, row.password)); // Retorna array de Users
        } catch (err) {
            return { error: err };
        }
    }

    async updateUser(user){
        try {
            const db = await connectionDb();
            const { id, name, email, password } = user;
            const result = db.run(
                "UPDATE user SET  name = ?, email = ?, password = ? WHERE id = ?",
                [name, email, password, id]
            );
            return result.changes > 0;
        } catch (err) {
            return {error: err};
        }
    }

    async deleteUser(id){
        try {
            const db = await connectionDb();
            const result = db.run("DELETE FROM user WHERE id = ?", [id]);
            return result.changes > 0;
        } catch (err) {
            return {error: err};
        }
    }
}

module.exports = new UserRepository();