const helper = (jsonLines, changeRowNumber, newValue) => {
	jsonLines[changeRowNumber] = newValue;

	const json = jsonLines.join('');

	return json;
};

export default helper;
