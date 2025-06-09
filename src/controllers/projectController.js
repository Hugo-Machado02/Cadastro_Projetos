const { error } = require("jquery");
const ProjectService = require("../services/ProjectService");

module.exports = {
    getAllProject: async (req, res) => {
        const projects = await ProjectService.getAllProjects();
        if(!projects || projects.length === 0){
            res.status(204).send();
        }
        res.status(200).json(projects);
    },

    getProjectId: async (req, res) => {
        const {id} = req.params;

        const project = await ProjectService.getProjectId(id);
        if(!project || project.length === 0){
            res.status(204).send();
        }
        res.status(200).json(project);
    },

    addProject: async (req, res) => {
        const data = req.body;
        const errors = {};

        if (!data.name) {
            errors.name = {error: "Nome do Projeto não preenchido"};
        }
        if (!data.startDate) {
            errors.startDate = {error: "Data não Selecionada"};
        }
        if (!data.endDate) {
            errors.endDate = {error: "Data não Selecionada"};
        }
        if(data.startDate > data.endDate){
            errors.endDate = {error: "A data de entrega está antes da data de inicio"};
        }
        if (!data.managerId) {
            errors.managerId = {error: "Gerente do Projeto não selecionado"};
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        const newProject = await ProjectService.addProject(data);
        if(newProject.success){
            return res.status(201).json({ newProject })
        }
        return res.status(newProject.status).json({ error: newProject.error })
    },

    updateProject: async (req, res) => {
        const {id} = req.params;
        const data = req.body;
        const dataEnvio = {}
        const errors = {}

        if(data.name){
            dataEnvio.name = data.name;
        }

        if(data.startDate){
            dataEnvio.startDate = data.startDate;
        }

        if(data.endDate){
            dataEnvio.endDate = data.endDate;
        }

        if(data.managerId){
            dataEnvio.managerId = Number(data.managerId);
        }

        if(data.startDate > data.endDate){
            errors.endDate = {error: "A data de entrega está antes da data de inicio"};
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        const updateProject = await ProjectService.updateProject(id, dataEnvio)

        if(updateProject.success){
            return res.status(200).json({ updateProject })
        }
        return res.status(updateProject.status).json({ error: updateProject.error })
    },

    deleteProject: async (req, res) => {
        const {id} = req.params;

        const deleteProject = await ProjectService.deleteProject(id);
        if(deleteProject.success){
            return res.status(201).json({ deleteProject })
        }
        return res.status(deleteProject.status).json({ error: deleteProject.error })
    },
};
