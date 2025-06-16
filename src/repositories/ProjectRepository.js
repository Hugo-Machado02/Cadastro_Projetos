const ProjectModel = require("../models/ProjectModel");
const UserModel = require("../models/UserModel");

class ProjectRepository{
    async createProject(project){
        try {
            const newProject = await ProjectModel.create(project);
            console.log("Projeto criado com sucesso:", newProject.id);
            return {success: true, project: newProject};
        } catch (err) {
            console.error("Erro ao criar projeto:", err);
            return {success: false, error: err};
        }
    }

    async getProjectId(id) {
        try {
            return await ProjectModel.findByPk(id, {
                include: [{
                    model: UserModel,
                    as: 'User',
                    attributes: ['id', 'name', 'email']
                }]
            });
        } catch (err) {
            console.error("Erro ao buscar projeto por ID:", err);
            return {success: false, error: err};
        }
    }

    async getAllProject() {
        try {
            return await ProjectModel.findAll({ 
                order: [['name', 'ASC']],
                include: [{
                    model: UserModel,
                    as: 'User',
                    attributes: ['id', 'name', 'email']
                }]
            });
        } catch (err) {
            console.error("Erro ao buscar todos os projetos:", err);
            return { success: false, error: err };
        }
    }

    async getProjectsManager(managerId) {
        try {
            return await ProjectModel.findAll({ 
                where: { managerId: managerId }, 
                order: [['name', 'ASC']],
                include: [{
                    model: UserModel,
                    as: 'User',
                    attributes: ['id', 'name', 'email']
                }]
            });
        } catch (err) {
            console.error("Erro ao buscar projetos por gerente:", err);
            return { success: false, error: err };
        }
    }

    async updateProject(id, dataUpdate){
        try {
            const [updated] = await ProjectModel.update(dataUpdate, { where: { id: id } });
            return {success: true, updated: updated > 0};
        } catch (err) {
            console.error("Erro ao atualizar projeto:", err);
            return {success: false, error: err};
        }
    }

    async deleteProject(id){
        try {
            const deleted = await ProjectModel.destroy({ where: { id: id } });
            return {success: true, deleted: deleted > 0};
        } catch (err) {
            console.error("Erro ao excluir projeto:", err);
            return {success: false, error: err};
        }
    }
}

module.exports = new ProjectRepository();