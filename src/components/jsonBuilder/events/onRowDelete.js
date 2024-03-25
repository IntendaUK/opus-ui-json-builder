//Event
const onRowDelete = props => {
	const { setState, state: { tRowDelete, mda, jsonFlatList, cursorRow } } = props;

	if (!tRowDelete)
		return;

	const node = jsonFlatList[cursorRow];

	delete node.obj[node.key];

	const json = JSON.stringify(mda);

	setState({
		deleteKeys: ['tRowDelete'],
		json
	});
};

export default onRowDelete;
