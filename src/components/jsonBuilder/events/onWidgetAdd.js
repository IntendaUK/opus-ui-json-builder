//Event
const event = props => {
	const { setState, getWgtState, state: { tWidgetAdd, mda, addingWidgetObject } } = props;
	if (!tWidgetAdd)
		return;

	const type = getWgtState('jsb-widget-adder-type').value;

	if (!addingWidgetObject.wgts)
		addingWidgetObject.wgts = [];

	const wgt = {
		type,
		prps: {}
	};

	if (['container', 'containerSimple', 'containerDnd', 'grid'].includes(type))
		wgt.wgts = [];

	addingWidgetObject.wgts.push(wgt);
	const json = JSON.stringify(mda);

	setState({
		deleteKeys: ['tWidgetAdd', 'addingWidgetObject'],
		json
	});
};

export default event;
