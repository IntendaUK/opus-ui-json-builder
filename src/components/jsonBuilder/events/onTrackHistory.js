//Event
const onTrackHistory = ({ setState, state: { json, history, historyIndex } }) => {
	if (!json || historyIndex < history.length - 1)
		return;

	const newHistoryIndex = historyIndex + 1;

	history.push(json);

	setState({
		deleteKeys: ['tUndo'],
		history,
		historyIndex: newHistoryIndex
	});
};

export default onTrackHistory;
