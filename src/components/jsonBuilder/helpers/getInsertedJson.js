const helper = (jsonLines, insertAtRowNumber, newRow) => {
	jsonLines.splice(insertAtRowNumber, 0, newRow);

	const json = jsonLines.join('');

	return json;
};

export default helper;
