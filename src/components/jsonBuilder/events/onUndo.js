//Event
const onUndo = ({ setState, state: { tUndo, history, historyIndex } }) => {
	if (!tUndo || historyIndex === 0)
		return;

	const newJson = history[historyIndex - 1];

	setState({
		deleteKeys: ['tUndo'],
		json: newJson,
		historyIndex: historyIndex - 1
	});
};

export default onUndo;
