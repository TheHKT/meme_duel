const config = require('./config/config.json');
const DB_config = require("./config/dbConfig.json");
const express = require("express");
const axios = require("axios"); //TODO might not need axios
const dbConnection = require("tedious").Connection;
const dbRequest = require("tedious").Request;

async function main() {
    const app = express();
    app.use(express.json());
    const connection = new dbConnection(DB_config);

    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", err => {
        err ? console.error(err.message) : console.log("connected to DB");     
    });

    connection.connect();

    function queryDatabase() {
        console.log("Reading rows from the Table...");

        // Read all rows from table
        const request = new dbRequest(
            `SELECT * FROM Player`,
            (err, rowCount) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`${rowCount} row(s) returned`);
                }
            }
        );

        request.on("row", columns => {
            columns.forEach(column => {
                console.log("%s\t%s", column.metadata.colName, column.value);
            });
        });

        connection.execSql(request);
    }

    app.get("/status", async (req, res) => {
        try {
            res.status(200).send('{"status":"Backend is running!"}');
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.listen(config.port, () => {
        console.log(`Listening on http://localhost:${config.port}`);
    });
}
main().catch((err) => console.log(err));