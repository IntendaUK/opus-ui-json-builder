const event = ({ setState, state: { tChangeCursorRow, cursorRow, jsonFlatList } }) => {
	if (!tChangeCursorRow)
		return;

	const newCursorRow = Math.max(0, Math.min(cursorRow + tChangeCursorRow, jsonFlatList.length - 1));

	setState({
		deleteKeys: ['tChangeCursorRow'],
		cursorRow: newCursorRow
	});
};

export default event;
