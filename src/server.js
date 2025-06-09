const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routers/configRouters");
const path = require("path");
require("dotenv").config({ path: ".env" });
const sequelize = require("./db/connection");

const { startDatabase } = require("./db/startDb");

const app = express();
app.use(cors({
    origin: process.env.URL_CLIENT,
    credentials: true, // Essencial para permitir o envio de cookies de sessão
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    },
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views')); 

app.use('/static', express.static(path.join(__dirname, 'public', 'static')));
app.use("/", apiRoutes);

startDatabase()
    .then(() => {
        const service = app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${service.address().port}`);
        });
    })
    .catch(error => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });