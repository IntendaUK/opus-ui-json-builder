//Event
const event = props => {
	const { setState, getWgtState, state: { tFlowAdd, mda, addingFlowObject } } = props;
	if (!tFlowAdd)
		return;

	const from = getWgtState('jsb-flow-adder-from').value;
	const fromKey = getWgtState('jsb-flow-adder-fromKey').value;
	const to = getWgtState('jsb-flow-adder-to').value;
	const toKey = getWgtState('jsb-flow-adder-toKey').value;

	if (!addingFlowObject.prps.flows)
		addingFlowObject.prps.flows = [];

	addingFlowObject.prps.flows.push({
		from,
		fromKey,
		to,
		toKey
	});
	const json = JSON.stringify(mda);

	setState({
		deleteKeys: ['tFlowAdd', 'addingFlowObject'],
		json
	});
};

export default event;
