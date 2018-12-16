const express = require("express");
const debugskr = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const { port, mongoUrl } = require('./config');
const {fetchUser} = require('./controllers/fetchUserWithToken')

// GraphQL Schema

const schema = require('./schema');
const setRouter = require('./routes');

/**
 * Help GraphQL interpret MongoDB ObjectID
 */
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};

const app = express();

mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
        }, () => {
    console.log("√ [Database Connected]")
});

global.__root = __dirname;

app.use(debugskr("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
setRouter(app);

const server = new ApolloServer({ schema, context:({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';
        // const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTUzMDUzNGJjNWYxMmJmYzNhNzAxNSIsImVtYWlsIjoiMzIxNDE1QDEyMzQuY29tIiwiaWF0IjoxNTQ0ODkyNDk5LCJleHAiOjE1NDQ5Nzg4OTl9.MoMyW9YMTFZK0CXFdfqu3jLGb2hvoEzov_7_y_PEm_w"
        // try to retrieve a user with the token
        const user = fetchUser(token);

        // optionally block the user
        // we could also check user roles/permissions here
        if (!user) throw new AuthorizationError('you must be logged in'); 

        // add the user to the context
        return { user };
    }
});

server.applyMiddleware({ app });

app.listen(port, () => {
    console.log(`√ Server started at http://localhost:${port}`);
});