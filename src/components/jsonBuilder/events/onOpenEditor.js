//Helpers
import findParentComponentNode from '../helpers/findParentComponentNode';

//Events
export const onOpenEditorKey = props => {
	const { setState, state: { tOpenEditorKey, cursorRow, jsonFlatList } } = props;
	if (!tOpenEditorKey)
		return;

	const node = jsonFlatList[cursorRow];

	const { obj: addingPropertyObject } = findParentComponentNode(node);

	const addingPropertyKey = node.key;
	const addingPropertyValue = node.value;

	setState({
		deleteKeys: ['tOpenEditorKey'],
		addingPropertyObject,
		addingPropertyKey,
		addingPropertyValue,
		addingPropertyFocus: 'key'
	});
};

export const onOpenEditorValue = props => {
	const { setState, state: { tOpenEditorValue, cursorRow, jsonFlatList } } = props;
	if (!tOpenEditorValue)
		return;

	const node = jsonFlatList[cursorRow];

	const { obj: addingPropertyObject } = findParentComponentNode(node);

	const addingPropertyKey = node.key;
	const addingPropertyValue = node.value;

	setState({
		deleteKeys: ['tOpenEditorValue'],
		addingPropertyObject,
		addingPropertyKey,
		addingPropertyValue,
		addingPropertyFocus: 'value'
	});
};
