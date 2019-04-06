'use strict';

Test.getTest = function(id) {
	const GET_TIER_QUERY = `select 1`;
	return mystockDb.query(GET_TIER_QUERY, {
		model: this,
		mapToModel: true
	});
};
