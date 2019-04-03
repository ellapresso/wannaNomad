'use strick';

const Test = require('../models/test');

const getTest = async ctx => {
	return ctx.send(200);
};

module.exports.getTest = getTest;
