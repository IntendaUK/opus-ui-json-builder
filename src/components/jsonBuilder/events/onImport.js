//Event
const event = props => {
	const { setState, state: { tImport, importing } } = props;
	if (!tImport || importing)
		return;

	setState({
		deleteKeys: ['tImport'],
		importing: true
	});
};

export default event;
