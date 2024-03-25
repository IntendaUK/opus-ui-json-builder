/* eslint-disable max-lines-per-function */

//React
import React, { useContext } from 'react';

//System
import { createContext } from 'opus-ui';

//Context
const JsonBuilderContext = createContext('iconContext');

//Helpers
const buildMda = ({ state: { cpnFlatList, jsonFlatList, cursorRow } }) => {
	const mda = {
		id: 'jsb-minimap',
		type: 'container',
		prps: {
			dir: 'vertical',
			autoChildMargins: true,
			autoChildMarginsSize: 'tinyPadding'
		},
		wgts: []
	};

	cpnFlatList.forEach((j, i) => {
		const cptList = [];

		if (j.obj.id)
			cptList.push(j.obj.id);
		if (j.obj.type)
			cptList.push(j.obj.type);

		const cpt = cptList.join(',');
		const marginLeft = `${j.depth * 12}px`;

		const selected = jsonFlatList[cursorRow].obj === j.obj;

		const id = `minimap-row-${i}`;

		mda.wgts.push({
			id,
			type: 'container',
			auth: ['selected', 'marginLeft'],
			prps: {
				dir: 'horizontal',
				padding: true,
				paddingSize: 'tinyPadding',
				backgroundColor: 'monokaiBlue',
				marginLeft,
				autoChildMarginsSize: 'tinyPadding',
				canClick: true,
				selected,
				fireScript: {
					actions: [
						{
							type: 'setState',
							target: '((state.jsb.mdaRows.wgts.((state.jsb.cursorRow)).id))',
							key: 'selected',
							value: false
						},
						{
							type: 'setState',
							target: 'jsb',
							key: 'cursorRow',
							value: j.rowNumber
						},
						{
							type: 'setState',
							target: `((state.jsb.mdaRows.wgts.${j.rowNumber}.id))`,
							key: 'selected',
							value: true
						}
					]
				},
				flows: [
					{
						fromKey: 'selected',
						toKey: 'backgroundColor',
						mapFunction: v => v ? 'monokaiRed' : 'monokaiBlue'
					}
				]
			},
			wgts: [
				{
					id: id + 'label',
					type: 'label',
					auth: ['cpt'],
					prps: {
						cpt,
						color: 'monokaiBg',
						flows: [
							{
								from: id,
								fromKey: 'selected',
								toKey: 'color',
								mapFunction: v => v ? 'monokaiFg' : 'monokaiBg'
							}
						]
					}
				}
			]
		});
	});

	return mda;
};

//Events

//Components
const Minimap = () => {
	const props = useContext(JsonBuilderContext);
	const { ChildWgt, state: { cpnFlatList } } = props;

	if (!cpnFlatList)
		return null;

	const mda = buildMda(props);

	return <ChildWgt mda={mda} />;
};

export default Minimap;
