const findParentComponentNode = node => {
	const { parentNode, obj } = node;

	if (obj.type !== undefined)
		return node;

	return findParentComponentNode(parentNode);
};

export default findParentComponentNode;
