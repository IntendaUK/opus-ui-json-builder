const helper = (jsonTree, flattened = []) => {
	jsonTree.forEach(node => {
		const { children, depth, parentNode, type, obj } = node;

		flattened.push(node);

		if (children) {
			helper(children, flattened);

			const text = type === 'object' ? '}' : ']';

			const closingNode = {
				text,
				depth,
				parentNode,
				obj
			};

			flattened.push(closingNode);
		}
	});

	return flattened;
};

export default helper;
