'use strict';

Test.getTest = function(id) {
	const GET_TIER_QUERY = `select 1`;
	// const query = GET_TIER_QUERY.replace('$id', id);
	return mystockDb.query(GET_TIER_QUERY, {
		model: this,
		mapToModel: true
	});
};
