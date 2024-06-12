require("dotenv").config();


const express = require("express");
const app = express();
app.use(express.json());


const morgan = require("morgan");
app.use(morgan("tiny"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));


const cors = require("cors");
app.use(cors());

const Person = require("./models/person");

app.use(express.static("build"));

app.get("/", (req, res) => {
    res.send("<h1>Backend PhoneBook</h1>");
});

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

app.get("/info", (req, res, next) => {
    Person.find({}).then(persons => {
        res.send(
            `<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>`
        );
    })
    .catch(error => next(error))
    ;
});
app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        res.json(person);
    })
    .catch(error => next(error))
});

app.delete("/api/persons/:id", (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end();
    })
    .catch(error => next(error))
});



app.post("/api/persons", (req, res) => {
    const body = req.body;
    if(!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number is missing"
        });
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    });
    person.save().then(savedPerson => {
        res.json(savedPerson);
    });

});


// Manejador de errores de solicitudes desconocidas (debe ser el último middleware)
const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"});
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if(error.name === "CastError") {
        return res.status(400).send({error: "malformatted id"});
    }
    next(error);
};

app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    //console.log(`http://localhost:${PORT}`);
});
