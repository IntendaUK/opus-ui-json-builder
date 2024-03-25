//Helpers
import findParentComponentNode from '../helpers/findParentComponentNode';

//Event
const event = props => {
	const { setState, state: { tMagicAddFlow, cursorRow, jsonFlatList } } = props;
	if (!tMagicAddFlow)
		return;

	const node = jsonFlatList[cursorRow];

	const { obj: addingFlowObject } = findParentComponentNode(node);

	setState({
		deleteKeys: ['tMagicAddFlow'],
		addingFlowObject
	});
};

export default event;
