//Helpers
import findParentComponentNode from '../helpers/findParentComponentNode';

//Event
const onWidgetDelete = props => {
	const { setState, state: { tWidgetDelete, mda, jsonFlatList, cursorRow } } = props;

	if (!tWidgetDelete)
		return;

	const node = jsonFlatList[cursorRow];
	const cpnNode = findParentComponentNode(node);
	const parentCpnNode = findParentComponentNode(cpnNode.parentNode);

	parentCpnNode.obj.wgts.spliceWhere(w => w === node.obj);

	const json = JSON.stringify(mda);

	setState({
		deleteKeys: ['tWidgetDelete'],
		json
	});
};

export default onWidgetDelete;
