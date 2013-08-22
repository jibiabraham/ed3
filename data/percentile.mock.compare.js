function mockVsPercentileByUser (mocks, users) {
	var data = [], perMock;
	for (var i = 0; i < users; i++) {
		perMock = [];
		for (var j = 0; j < mocks; j++) {
			perMock.push({
				x: j + 1, 
				y: 100 * Math.random(),
			});
		};
		data.push({
			values: perMock, 
			key: "User " + (i + 1)
		});
	};
	return data;
}