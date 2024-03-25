const getValueType = value => {
	if (Array.isArray(value))
		return 'array';
	else if (!!value && typeof(value) === 'object')
		return 'object';

	return 'leaf';
};

const getNodeText = (key, value, type, parentIsArray) => {
	if (parentIsArray) {
		if (type === 'leaf')
			return value;
		else if (type === 'array')
			return '[';

		return '{';
	}

	if (type === 'leaf')
		return `${key}: ${value}`;
	else if (type === 'array')
		return `${key}: [`;

	return `${key}: {`;
};

const helper = (json, parentNode = null, depth = 0) => {
	const nodes = Object.entries(json).map(([k, v]) => {
		const type = getValueType(v);

		const parentIsArray = parentNode?.type === 'array';
		const text = getNodeText(k, v, type, parentIsArray);

		const node = {
			text,
			key: k,
			value: v,
			type,
			parentNode,
			depth,
			obj: json
		};

		if (!!v && typeof(v) === 'object')
			node.children = helper(v, node, depth + 1);

		return node;
	});

	return nodes;
};

export default helper;
