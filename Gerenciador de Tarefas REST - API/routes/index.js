module.exports = app => {
    //    Método HTTP : GET
    //     endpoint : /status
    //     Exemplo de resposta {json} esperada : {"status": "Everything is working well!"}
    app.get("/status", (req, res) => {
        res.json({ status: "Everything is working well!" });
    });
};