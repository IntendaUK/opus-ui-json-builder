const helper = jsonFlatList => {
	const list = [];

	const objs = [];

	jsonFlatList.forEach((j, i) => {
		if ((j.key !== 'id' && j.key !== 'type') || (objs.some(o => o === j.obj)))
			return;

		objs.push(j.obj);

		list.push({
			obj: j.obj,
			rowNumber: i,
			depth: j.depth
		});
	});

	return list;
};

export default helper;
