const express = require("express");

const PORT = 3001;

const app = express();

app.get(
    "/",
    (req, res) => {
        res.json({
            message: "Hello World!"
        });
    }
);

app.listen(
    PORT,
    () => {
        console.log(`Server listening on ${PORT}...`);
    }
);