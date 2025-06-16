const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: ".env" });

const sequelize = require("./db/connection");

const apiRoutes = require("./routers/configRouters");

const app = express();
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET_KEY || 'fallback_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: parseInt(process.env.SESSION_EXPIRY || 86400000)
    },
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views')); 

app.use('/static', express.static(path.join(__dirname, 'public', 'static')));
app.use("/", apiRoutes);

sequelize.sync()
    .then(async () => {
        console.log('Banco de dados sincronizado com sucesso');
        
        const service = app.listen(process.env.PORT || 3000, () => {
            console.log(`Servidor rodando na porta ${service.address().port}`);
        });
    })
    .catch(error => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });