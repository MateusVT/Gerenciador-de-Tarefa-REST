module.exports = app => {
    const Users = app.db.models.Users;
    //     Função : Apresenta o usúario autenticado
    //     Método HTTP : GET
    //     endpoint : /usuario
    //     Header : {"Authorization": "JWT tokenUsuario"}  
    //     Exemplo de Resposta {json} :  
    //    { "id" : "10",
    //      "emai": "mateus@gmail.com",
    //     "password": "123"}

    app.route("/user")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes: ["id", "name", "email"]
            })
                .then(result => {
                    if (result) {
                        res.status(200).json(result)
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => res.status(412).json({ msg: error.message }));
        })
        //     Função : Exclui um usúario cadastrado
        //     Método HTTP : DELETE
        //     endpoint : /usuario
        //     Header : {"Authorization": "JWT tokenUsuario"}  
        //     Exemplo de Resposta : {VAZIO} 

        .delete((req, res) => {
            Users.destroy({ where: { id: req.user.id } })
                .then(result => res.sendStatus(204))
                .catch(error => res.status(412).json({ msg: error.message }));
        });

    //     Função : Cadastrar um novo usúario
    //     Método HTTP : POST
    //     endpoint : /newUser
    //     Exemplo de Parametros de Entrada {json}  : 
    //      { "name" : "Mateus",    
    //      "email": "mateus@gmail.com",
    //      "password": "123"}
    //     Exemplo de Resposta {json}  : 
    //      { "id" : "10",
    //       "emai": "mateus@gmail.com",
    //       "password": "zzi12j391@*#&@mas",
    //       "updated_at": "2018-12-09T15:46:00.778Z",
    //       "created_at": "2018-12-09T15:46:00.778Z" }

    app.post("/newUser", (req, res) => {
        Users.create(req.body)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(412).json({ msg: error.message }));
    })
};