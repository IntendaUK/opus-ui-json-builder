//System Helpers
import { clone } from '@intenda/opus-ui';

//Helpers
import findParentComponentNode from '../helpers/findParentComponentNode';

//Event
const event = props => {
	const { setState, state: { tWidgetDuplicate, mda, jsonFlatList, cursorRow } } = props;

	if (!tWidgetDuplicate)
		return;

	const node = jsonFlatList[cursorRow];
	const cpnNode = findParentComponentNode(node);
	const parentCpnNode = findParentComponentNode(cpnNode.parentNode);

	const copied = clone({}, cpnNode.obj);

	parentCpnNode.obj.wgts.push(copied);

	const json = JSON.stringify(mda);

	setState({
		deleteKeys: ['tWidgetDuplicate'],
		json
	});
};

export default event;
