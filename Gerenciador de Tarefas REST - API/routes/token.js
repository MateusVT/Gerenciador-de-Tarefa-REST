import jwt from "jwt-simple";

module.exports = app => {
    const cfg = app.libs.config;
    const Users = app.db.models.Users;

    //    Método HTTP : POST
    //     endpoint : /token
    //     Exemplo de Parametros de Entrada : {json} 
    //    {"email": "mateus@gmail.com",
    //     "password": "123"}
    //     Exemplo de resposta {json} : {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODV9.SrUHIl8lq_y7LxDGvWLPRZ9W9c4C37t97ysMS_BfIbs"}

    app.post("/token", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            Users.findOne({ where: { email: email } })
                .then(user => {
                    if (Users.isPassword(user.password, password)) {
                        const payload = { id: user.id };
                        res.status(200).json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => res.sendStatus(401));
        } else {
            res.sendStatus(401);
        }
    });
};