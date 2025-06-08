const ProjectService = require("../services/ProjectService");

module.exports = {
    getAllProject: async (req, res) => {
        const projects = await ProjectService.getAllProjects();
        if(!projects || projects.length === 0){
            res.status(204).send();
        }
        res.status(200).json(projects);
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
        if (!data.managerId) {
            errors.managerId = {error: "Gerente do Projeto não selecionado"};
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        const newProject = await ProjectService.addProject(data);
        if(newProject.succes){
            return res.status(201).json({ newProject })
        }
        return res.status(newProject.status).json({ error: newProject.error })
    },

    // update: async (req, res) => {
    //     const { id, name, email, password } = req.body;
    //     if (id && name && email && password) {
    //         const resultUpdate = await userModel.updateUser(req.body);
    //         if (resultUpdate) {
    //             res.json({ status: 200, data: "Alteração realizada com Sucesso" });
    //         } else {
    //             res.json({ status: 500, data: "Erro ao realizar a alteração" });
    //         }
    //     } else {
    //         res.json({ status: 500, data: "Dados Faltando" });
    //     }
    // },
};
