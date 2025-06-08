const LoginService = require("../services/loginService");

module.exports = {

    login: async (req, res) => {
        const {email, password} = req.body;
        const errors = {};

        if (!email) {
            errors.email = {error: "Email não preenchido"};
        }
        if (!password) {
            errors.password = {error: "Senha não preenchida"};
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        const result = await LoginService.login(email, password);

        if(result.succes){
            req.session.user = {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
            };
            return res.status(200).json({succes: true, user: req.session.user});
        }
        return res.status(result.status).json({ error: result.error });
    },

    logout: async (req, res) => {
        req.session.destroy(error => {
            if (error) {
                console.error("Erro ao destruir sessão:", err);
                return res.status(500).json({ error: "Não foi possível fazer logout." });
            }
            
            res.clearCookie('connect.sid');
            return res.status(200).json({ message: "Logout realizado com sucesso." });
        });
    }
};
