const ProjectModel = require("../models/ProjectModel");

class ProjectRepository{
    async createProject(project){
        try {
            await ProjectModel.create(project);
            return {sucess: true}
        } catch (err) {
            return {sucess: false, error: err};
        }
    }

    async getProjectId (id) {
        try {
            return await ProjectModel.findByPk(id)
        } catch (err) {
            return {error: err};
        }
    }

    async getAllProject() {
        try {
            return await ProjectModel.findAll({ order: [['name', 'ASC']] });
        } catch (err) {
            return { error: err };
        }
    }

    async getProjectsManager(managerId) {
        try {
            return await ProjectModel.findAll({ where: { managerId: managerId }, order: [['name', 'ASC']] });
        } catch (err) {
            return { error: err };
        }
    }

    async updateProject(id, dataUpdate){
        try {
            const [userUpdate] = await ProjectModel.update(dataUpdate, { where: { id: id } });
            return userUpdate === 1;
        } catch (err) {
            return {error: err};
        }
    }
}

module.exports = new ProjectRepository();