module.exports = app => {
    const Tasks = app.db.models.Tasks;
    app.route("/tasks")
        .all(app.auth.authenticate())
        //     Função : Apresenta a lista de tarefas de um usúario
        //     Método HTTP : GET
        //     endpoint : /tasks
        //     Header : {"Authorization": "JWT tokenUsuario"}  
        //     Exemplo de Resposta {json} :  
        //      [{
        //         "id": 1,
        //         "title": "Estudar",
        //         "done": false,
        //         "updated_at": "2018-12-09:46:00.778Z",
        //         "created_at": "2018-12-09:46:00.778Z"
        //                   "user_id": 86 }]

        .get((req, res) => {
            Tasks.findAll({
                where: { user_id: req.user.id }
            })
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })

        //     Função : Cadastra uma nova tarefa para o usúario
        //     Método HTTP : POST
        //     endpoint : /tasks
        //     Header : {"Authorization": "JWT tokenUsuario"}  
        //     Exemplo de Parametros de Entrada {json}  : 
        //      {"title": "Estudar"}
        //     Exemplo de Resposta {json} :  
        //   {        "id": 1,
        //           "title": "Estudar",
        //           "done": false,
        //           "updated_at": "2018-09-03T15:46:00.778Z",
        //           "created_at": "2018-09-03T15:46:00.778Z"
        //           "user_id": 1       }
        .post((req, res) => {
            req.body.user_id = req.user.id;
            Tasks.create(req.body)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    //     Função : Exibe informações de uma determinad tarefa
    //     Método HTTP : GET
    //     endpoint : /tasks/:idTarefa
    //     Header : {"Authorization": "JWT tokenUsuario"}  
    //     Exemplo de Resposta {json} :  
    //   {
    //           "id": 1,
    //           "title": "Estudar",
    //           "done": false,
    //           "updated_at": "2018-12-09T15:46:00.778Z",
    //           "created_at": "2018-12-09T15:46:00.778Z"
    //           "user_id": 86            
    //       }   

    app.route("/tasks/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Tasks.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            })
                .then(result => {
                    if (result) {
                        res.status(200).json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })

        //     Função : Atualiza status de uma determinada tarefa
        //     Método HTTP : PUT
        //     endpoint : /tasks/:idTarefa
        //     Header : {"Authorization": "JWT tokenUsuario"}  
        //     Exemplo de Parametros de Entrada {json}  : 
        //      {"title": "Estudar",
        //       "done": true}

        .put((req, res) => {
            Tasks.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })

        //     Função : Atualiza status de uma determinada tarefa
        //     Método HTTP : DELETE
        //     endpoint : /tasks/:idTarefa
        //     Header : {"Authorization": "JWT tokenUsuario"}  
        .delete((req, res, next) => {
            Tasks.destroy({
                where:
                {
                    id: req.params.id,
                    user_id: req.user.id
                }
            })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                });
        });
};