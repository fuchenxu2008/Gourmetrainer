const express = require("express");
const debugskr = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const { port, mongoUrl } = require('./config');
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

const server = new ApolloServer({ schema });

server.applyMiddleware({ app });

app.listen(port, () => {
    console.log(`√ Server started at http://localhost:${port}`);
});