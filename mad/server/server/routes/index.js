'use strict';

module.exports = (app) => {
    require('./base.route')(app);
    require('../api')(app);
};
