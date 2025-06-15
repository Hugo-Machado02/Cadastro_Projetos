const sequelize = require('./connection'); 
const User = require('../models/UserModel'); 
const Project = require('../models/ProjectModel'); 
const bcrypt = require('bcrypt');

User.hasMany(Project, {
    foreignKey: 'managerId',
    as: 'ManagedProject', 
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'managerId',
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
});

async function createAdminUser() {
    try {
        const adminExists = await User.findOne({ where: { email: 'admin@gmail.com' } });
        
        if (!adminExists) {
            await User.create({
                name: 'Administrador',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('admin123', 10),
                dataCadastro: new Date(),
                status: true
            });
        }
    } catch (error) {
        console.error('Erro ao criar usuário administrador:', error);
    }
}

async function startDatabase() {
    try {
        await sequelize.sync(); 
        await createAdminUser();
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
        process.exit(1); 
    }
}

module.exports = {
    sequelize,
    User,
    Project,
    startDatabase
};