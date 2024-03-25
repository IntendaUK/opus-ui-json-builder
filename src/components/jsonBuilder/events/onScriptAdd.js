//Helpers
import findParentComponentNode from '../helpers/findParentComponentNode';

//Event
const event = props => {
	const { setState, state: { tScriptAdd, jsonFlatList, cursorRow } } = props;

	if (!tScriptAdd)
		return;

	const node = jsonFlatList[cursorRow];
	const { obj: cpn } = findParentComponentNode(node);

	setState({
		deleteKeys: ['tScriptAdd'],
		addingScriptObject: cpn
	});
};

export default event;
