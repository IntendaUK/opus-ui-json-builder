/* eslint-disable max-lines-per-function */

const event = ({ setState, state: { jsonFlatList } }) => {
	if (!jsonFlatList)
		return;

	const wgts = jsonFlatList.map((node, i) => {
		const { text, depth } = node;

		const tabbing = '&emsp;'.repeat(depth * 4);
		const htmlLine = [
			'<span style="font-family: monospace; color: var(--colors-monokaiFg)">',
			`${tabbing}${text}`,
			'</span>'
		].join('');

		const container = {
			id: `container-${i}`,
			type: 'containerSimple',
			prps: {
				dir: 'horizontal',
				flows: [
					{
						from: 'jsb',
						fromKey: 'cursorRow',
						toKey: 'backgroundColor',
						mapFunction: v => v === i ? 'monokaiComment' : 'transparent'
					}
				]
			},
			wgts: [
				{
					id: `lineNum-${i}`,
					type: 'label',
					prps: {
						cpt: i,
						color: 'monokaiComment',
						fontFamily: 'monospace',
						justify: 'right',
						width: 'padding',
						marginRight: 'padding',
						flows: [
							{
								from: 'jsb',
								fromKey: 'cursorRow',
								toKey: 'color',
								mapFunction: v => v === i ? 'monokaiFg' : 'monokaiComment'
							}
						]
					},
					auth: ['cpt']
				},
				{
					id: `line-${i}`,
					type: 'html',
					prps: { tpl: htmlLine },
					auth: ['tpl']
				}
			]
		};

		return container;
	});

	const mdaRows = {
		id: 'inny',
		type: 'containerSimple',
		prps: {
			mainAxisAlign: 'start',
			singlePage: true,
			height: '100%'
		},
		wgts
	};

	setState({ mdaRows });
};

export default event;
