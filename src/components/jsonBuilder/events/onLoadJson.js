//Helpers
import buildJsonTreeNodes from '../helpers/buildJsonTreeNodes';
import getFlatJsonTree from '../helpers/getFlatJsonTree';
import getFlatCpnTree from '../helpers/getFlatCpnTree';

//Event
const event = ({ setState, state: { json, cursorRow } }) => {
	const mda = JSON.parse(json);
	const jsonLines = JSON.stringify(mda, null, 2).split('\n');

	const jsonTreeNodes = buildJsonTreeNodes(mda);
	const jsonFlatList = getFlatJsonTree(jsonTreeNodes);
	const cpnFlatList = getFlatCpnTree(jsonFlatList);

	const newState = {
		mda,
		jsonLines,
		jsonTreeNodes,
		jsonFlatList,
		cpnFlatList
	};

	if (cursorRow >= jsonFlatList.length)
		newState.cursorRow = jsonFlatList.length - 1;

	setState(newState);
};

export default event;
