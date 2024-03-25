/* eslint-disable max-lines-per-function */

const helper = jsonLines => {
	const treeNodes = jsonLines.map(j => {
		const leadingSpaces = j.search(/\S/);

		return {
			line: j,
			depth: leadingSpaces / 2,
			parentLineNum: null
		};
	});

	const stack = [];
	let depthMarker = treeNodes[0].depth;
	let parentLineNum = null;

	treeNodes.forEach((t, i) => {
		if (t.depth === depthMarker) {
			t.parentLineNum = parentLineNum;

			return;
		} else if (t.depth > depthMarker) {
			stack.push({
				lineNum: i - 1,
				depth: t.depth
			});

			parentLineNum = i - 1;
			t.parentLineNum = parentLineNum;
			depthMarker = t.depth;
		} else if (t.depth < depthMarker) {
			while (t.depth < depthMarker) {
				stack.pop();

				const topOfStack = stack[stack.length - 1];
				parentLineNum = topOfStack?.lineNum ?? 0;
				depthMarker = topOfStack?.depth ?? null;
			}

			t.parentLineNum = parentLineNum;
		}
	});

	return treeNodes;
};

export default helper;
