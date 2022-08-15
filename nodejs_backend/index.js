const config = require('../react_frontend/config/config.json');
const DB_config = require("../react_frontend/config/dbConfig.json");
const express = require("express");
const axios = require("axios"); //TODO might not need axios
const sql = require("mssql");

async function main() {
    const app = express();
    app.use(express.json());
    try {   //connecting to DB
        await sql.connect(DB_config)
        console.log("connected to db...")
    } catch (err) {
        console.log("could not connect to db...");
    }

    app.get("/status", async (req, res) => {
        
        try {
            console.log("/status");
            res.status(200).send({"status":"Backend is running!"});
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put("/login", async (req, res) => {
        try {
            const inputData = req.body;
            const result = await sql.query(`SELECT * FROM Player WHERE username='${inputData.username}'`);
            if(result.recordset[0].pw == inputData.pw){
                console.log("SUCESSFUL LOGIN")
            } else {
                console.log("FUCK OFF")
            }
            res.status(200).send(result)
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    })

    app.post("/registerPlayer", async (req, res) => {
        try {
            const data = req.body;
            const request = await sql.query(`INSERT INTO Player(username, email, pw) VALUES ('${data.username}', '${data.email}', '${data.pw}');`)
            res.status(200).send(request)
        } catch (err) {
            console.log(data);
            res.status(500).send(err);
        }
    });

    app.listen(config.port, () => {
        console.log(`Listening on http://localhost:${config.port}`);
    });
}
main().catch((err) => console.log(err));