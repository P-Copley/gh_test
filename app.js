const express = require("express");
const { getSnacks, getSnackById, postSnack } = require("./controllers/snacks.controllers");
const { getWelcomeMessage } = require("./controllers/api.controllers");
const { handlePSQLErrors } = require("./controllers/errors.controller");

const app = express();

app.use(express.json())

app.get("/api", getWelcomeMessage)

app.get("/api/snacks", getSnacks)

app.get("/api/snacks/:snack_id", getSnackById)

app.post("/api/snacks", postSnack)

app.all("/*", (req, res, next) => { 
    res.status(404).send({ message: "path not found!!"})
})

// Error handling middleware
app.use(handlePSQLErrors)

app.use((err, req, res, next) => { 
    if (err.status) { 
        res.status(err.status).send({message: err.message})
    }
    next(err)
})

app.use((err, req, res, next) => { 
    res.status(500).send({ message: 'internal server error!' })
})

module.exports = app