/**
 * Import express and store in a constant.
 */
const express = require("express");

/**
 * Create an express application by running express as a function,
 * and store it to a constant.
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')) ;

/**
 * Define the port number that the express application should use.
 */
const port = 3000;

/**
 * Import the database connection file.
 */
const db = require("./db.config");

/**
 * Import the class models.
 */
const ClassModel = require("./Models/Class");

/**
 * Handle the POST request to create a class.
 */
app.use("/create" ,(req, res) => {
    /**
     * Call the create function on the class model, and pass the data that you receive.
     */
    ClassModel.create({
        title: "C#",
        subtitle: "Debug",
        content: "Some Content",
    })
        .then((result) => {
            return res.json({
                message: "Record created successfully!",
            });
        })
        .catch((error) => {
            console.log(error);
            return res.json({
                message: "Unable to create a record!",
            });
        });
});

/**
 * Handle the GET request to fetch a single class.
 */
app.get("/get-latest-class", (req, res, next) => {
    /**
     * Call the findOne function on the Class model.
     *
     * You can pass the name of the columns you
     * want in the result by using the 'attributes' key.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value for any coumn.
     */
    ClassModel.findOne({
        attributes: ["id", "title"],
        where: {
            id: 1,
        },
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({
                message: 'Unable to fetch the record!'
            });
        });
});

/**
 * Handle the GET request to fetch all posts.
 */
app.get("/get-all-class", (req, res, next) => {
    /**
     * Call the findAll function on the Post model.
     *
     * You can pass the name of the columns you
     * want in the result by using the 'attributes' key.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value for any coumn.
     */
    ClassModel.findAll({
        attributes: ["id", "title"]
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
});

/**
 * Handle the POST request to update a single post.
 */
app.post("/update-post", (req, res, next) => {
    /**
     * Call the update function on the Post model.
     *
     * You can pass the name of the columns and their new value
     * in JSON format.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value to update the specific record.
     */
    ClassModel.update({
        title: "Updated Title Name!",
    }, {
        where: {
            id: 1,
        },
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({});
        });
});

/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        /**
         * Syncronize the models.
         */
        await ClassModel.sync({
            alter: true,
        });

        /**
         * Start the web server on the specified port.
         */
        app.listen(port,() => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};
/**
 * Initialize the application.
 */
initApp();
