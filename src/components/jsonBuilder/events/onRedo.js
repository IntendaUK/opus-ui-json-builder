//Event
const onRedo = ({ setState, state: { tRedo, history, historyIndex } }) => {
	if (!tRedo || historyIndex === history.length - 1)
		return;

	const newHistoryIndex = historyIndex + 1;
	const newJson = history[newHistoryIndex];

	const newState = {
		deleteKeys: ['tRedo'],
		json: newJson
	};

	if (newHistoryIndex === history.length - 1)
		history.splice(newHistoryIndex, 1);
	else
		newState.historyIndex = newHistoryIndex;

	setState(newState);
};

export default onRedo;
