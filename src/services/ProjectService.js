const ProjectRepository = require("../repositories/ProjectRepository");
const UserRepository = require("../repositories/UserRepository")

class UserService{
    async getAllProjects(){
        return await ProjectRepository.getAllProject();
    }

    async addProject(data){
        const userManager = await UserRepository.getUserId(data.managerId);
        if(!userManager){
            return {status: 404, error: "Usuário não encontrado"}
        }

        data.startDate = this.#converteString(data.startDate);
        data.endDate = this.#converteString(data.endDate);
        
        const newProject = await ProjectRepository.createProject(data);
        
        if(!newProject.sucess){
            return {status: 500, error: "Não foi possível cadastrar o Projeto"}
        }

        return {succes: true}
    }

    #converteString(date){
        const conversion = `${date}T00:00:00-03:00`;
        return new Date(conversion);
    }
}

module.exports = new UserService();