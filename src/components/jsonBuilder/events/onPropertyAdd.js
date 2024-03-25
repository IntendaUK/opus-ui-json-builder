//Event
const event = props => {
	const { setState, setWgtState, getWgtState, state } = props;
	const { tPropertyAdd, mda, addingPropertyObject, addingPropertyKey } = state;

	if (!tPropertyAdd)
		return;

	const key = getWgtState('jsb-property-adder-key').value;
	const value = getWgtState('jsb-property-adder-value').value;

	if (addingPropertyKey && addingPropertyKey !== 'id')
		delete addingPropertyObject.prps[addingPropertyKey];

	if (addingPropertyKey === 'id' && addingPropertyObject.prps)
		addingPropertyObject.id = value;
	else
		addingPropertyObject.prps[key] = value;

	const json = JSON.stringify(mda);

	setState({
		deleteKeys: [
			'tPropertyAdd', 'addingPropertyObject', 'addingPropertyKey',
			'addingPropertyValue', 'addingPropertyFocus'
		],
		json
	});

	setWgtState('POPUP1', { display: false });
};

export default event;
