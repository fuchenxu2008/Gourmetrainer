const imageRoute = require('./imageRoute');

const setRouter = (app) => {
    app.use('/api', imageRoute);
};

module.exports = setRouter;