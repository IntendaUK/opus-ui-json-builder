//Helpers
import getUpdatedJson from '../helpers/getUpdatedJson';

//Event
const event = props => {
	const { setState, getWgtState, setWgtState, state } = props;
	const { mdaRows, tSaveValue, editingRow, jsonLines } = state;

	if (!tSaveValue)
		return;

	const newValue = getWgtState('jsb-editor').value;

	const json = getUpdatedJson(jsonLines, editingRow, newValue);

	setState({
		deleteKeys: ['tSaveValue', 'editingRow'],
		json
	});

	setWgtState(mdaRows.wgts[editingRow].id, { cpt: jsonLines[editingRow] });
};

export default event;
