const ProjectRepository = require("../repositories/ProjectRepository");
const UserRepository = require("../repositories/UserRepository")

class UserService{
    async getAllProjects(){
        return await ProjectRepository.getAllProject();
    }

    async getProjectId(id){
        return await ProjectRepository.getProjectId(id);
    }

    async addProject(data){
        const userManager = await UserRepository.getUserId(data.managerId);
        if(!userManager){
            return {status: 404, error: "Usuário não encontrado"}
        }

        data.startDate = this.#converteString(data.startDate);
        data.endDate = this.#converteString(data.endDate);
        
        const newProject = await ProjectRepository.createProject(data);
        
        if(!newProject.success){
            return {status: 500, error: "Não foi possível cadastrar o Projeto"}
        }

        return {success: true}
    }

    async updateProject(id, data){
        const dataUpdate = {}

        const projectValidation = await ProjectRepository.getProjectId(id);
        if(!projectValidation){
            return {status: 404, error: "Projeto não encontrado"}
        }

        if (data.name && data.name != projectValidation.name){
            dataUpdate.name = data.name;
        }

        if (data.managerId && data.managerId != projectValidation.managerId){
            dataUpdate.managerId = data.managerId;
        }

        if (data.startDate){
            data.startDate = this.#converteString(data.startDate);
            if(Number(data.startDate) != Number(projectValidation.startDate)){
                dataUpdate.startDate = data.startDate;
            }  
        }

        if (data.endDate){
            data.endDate = this.#converteString(data.endDate);
            if(Number(data.endDate) != Number(projectValidation.endDate)){
                dataUpdate.endDate = data.endDate;
            }  
        }
        
        console.log(dataUpdate)

        if(Object.keys(dataUpdate).length > 0){
            const result = await ProjectRepository.updateProject(id, dataUpdate);

            if(!result.success){
                return {status: 500, error: "Não foi possível cadastrar o Usuário"}
            }
            return {success: true}
        }
        return {status: 500, error: "Dados iguais! Sem necessidade de alteração"}
    }

    async deleteProject(id){
        const result = await ProjectRepository.deleteProject(id);
        if(!result.success){
            return {status: 500, error: "Não foi possível Deletar o Projeto"}
        }
        return {success: true}
    }

    #converteString(date){
        const conversion = `${date}T00:00:00-03:00`;
        return new Date(conversion);
    }
}

module.exports = new UserService();