const config = require('../react_frontend/config/config.json');
const DB_config = require("../react_frontend/config/dbConfig.json");
const express = require("express");
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
            res.status(200).send({ "status": "Backend is running!" });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put("/login", async (req, res) => {
        const resData = {
            loginSucess: false,
            Data: {},
            errorOccurred: false,
            errorMessage: "Unknown Error occurred!",
        }
        const inputData = req.body;
        const ps = new sql.PreparedStatement()
        ps.input('username', sql.VarChar)
        ps.prepare("SELECT * FROM Player WHERE username=@username", err => {
            ps.execute({ username: inputData.username }, (err, result) => {
                try {
                    if (result.recordset.length != 1) {
                        throw {
                            name: "Unkown User",
                            message: "Username is not registered",
                        };
                    }
                    if (result.recordset[0].pw == inputData.pw) { //TODO check if this username even exists in db? if not than return a json
                        resData.loginSucess = true;
                        console.log("SUCESSFUL LOGIN");
                        resData.Data =
                        {
                            playerID: result.recordset[0].playerID,
                            username: result.recordset[0].username,
                            email: result.recordset[0].email,
                            pw: result.recordset[0].pw
                        }
                    } else {
                        throw {
                            name: "Wrong PW",
                            message: "This password does not match!",
                        };
                    }
                } catch (err) {
                    resData.errorOccurred = true;
                    resData.errorMessage = err.message;
                    console.log(err);
                    //res.status(500).send(resData);
                }
                ps.unprepare(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(resData);
                    } else {
                        res.status(200).send(resData);
                    }
                })
            })
        })
    });

    app.post("/registerPlayer", async (req, res) => {
        const inputData = req.body;
        const resData = {
            registerSucess: false,
            Data: {
                username: inputData.username,
                email: inputData.email,
                pw: inputData.pw
            },
            errorOccurred: false,
            errorMessage: "Unknown Error occurred!",
        }
        var ps = new sql.PreparedStatement()
        ps.input('username', sql.VarChar)
        ps.input('email', sql.VarChar)
        ps.input('pw', sql.VarChar)
        ps.prepare("INSERT INTO Player(username, email, pw) VALUES (@username, @email, @pw)", err => {
            ps.execute({ username: inputData.username, email: inputData.email, pw: inputData.pw }, (err, result) => {
                if (err) {
                    resData.errorMessage = "Email or Username already taken!"
                    resData.errorOccurred = true;
                    console.log(resData.errorMessage);
                } else {
                    resData.registerSucess = true;
                    console.log("SUCESSFUL REGISTER");
                    console.log(result)
                }
                ps.unprepare(err => {
                    if (err) {
                        resData.errorMessage = "An DB error occurred!"
                        resData.errorOccurred = true;
                        res.status(500).send(resData);
                    } else {
                        res.status(200).send(resData);
                    }
                })
            })
        })
    });

    app.listen(config.port, () => {
        console.log(`Listening on http://localhost:${config.port}`);
    });
}
main().catch((err) => console.log(err));