const sequelize = require('./connection'); 
const User = require('../models/UserModel'); 
const Project = require('../models/ProjectModel'); 

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

async function startDatabase() {
    try {
        await sequelize.sync(); 
        console.log('Todos os modelos foram sincronizados com sucesso.');
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