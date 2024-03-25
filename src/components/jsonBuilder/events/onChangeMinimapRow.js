const event = (
	{ setState, state: { tChangeMinimapRow, cursorRow, cpnFlatList, jsonFlatList } }
) => {
	if (tChangeMinimapRow === 0)
		return;

	const currentObject = jsonFlatList[cursorRow].obj;
	const currentIndex = cpnFlatList.findIndex(f => f.obj === currentObject);

	const newIndex = Math.max(0, Math.min(currentIndex + tChangeMinimapRow, cpnFlatList.length - 1));

	const newCursorRow = cpnFlatList[newIndex].rowNumber;

	setState({
		deleteKeys: ['tChangeMinimapRow'],
		cursorRow: newCursorRow
	});
};

export default event;
