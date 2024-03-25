//Helpers
import findParentComponentNode from '../helpers/findParentComponentNode';

//Event
const event = props => {
	const { setState, state: { tMagicAdd, cursorRow, jsonFlatList } } = props;
	if (!tMagicAdd)
		return;

	const node = jsonFlatList[cursorRow];

	const { obj: addingPropertyObject } = findParentComponentNode(node);

	setState({
		deleteKeys: ['tMagicAdd'],
		addingPropertyObject
	});
};

export default event;
