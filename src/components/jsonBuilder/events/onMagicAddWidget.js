//Helpers
import findParentComponentNode from '../helpers/findParentComponentNode';

//Event
const event = props => {
	const { setState, state: { tMagicAddWidget, cursorRow, jsonFlatList } } = props;
	if (!tMagicAddWidget)
		return;

	const node = jsonFlatList[cursorRow];

	const { obj: addingWidgetObject } = findParentComponentNode(node);

	setState({
		deleteKeys: ['tMagicAddWidget'],
		addingWidgetObject
	});
};

export default event;
