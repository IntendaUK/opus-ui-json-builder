/* eslint-disable max-lines-per-function, max-lines */

//React
import React, { useContext } from 'react';

//System
import { createContext, getPropSpecs } from '@intenda/opus-ui';

//Context
const JsonBuilderContext = createContext('iconContext');

//Helpers
const getIds = nodes => {
	const ids = [];

	nodes.forEach(n => {
		if (!n.obj.id || !n.obj.prps)
			return;

		if (ids.some(f => f.id === n.obj.id))
			return;

		ids.push({ id: n.obj.id });
	});

	return ids;
};

const getKeys = () => {
	const keys = [];

	const propSpecs = getPropSpecs();

	Array.from(propSpecs.values()).forEach(spec => {
		Object.keys(spec).forEach(k => {
			const key = k + '';

			if (keys.some(f => f.key === key))
				return;

			keys.push({ key });
		});
	});

	return keys;
};

//Events

//Components
const Component = () => {
	const { ChildWgt, state: { addingFlowObject, jsonFlatList } } = useContext(JsonBuilderContext);

	if (!addingFlowObject)
		return null;

	const ids = getIds(jsonFlatList);
	const keys = getKeys();

	const mda = {
		type: 'container',
		container: 'SYSMODAL',
		traits: [
			'experiments/jsonbuilder/traits/addPropertyOnEnter'
		],
		prps: {
			padding: true,
			autoChildMargins: true,
			backgroundColor: 'iconPrimary',
			hasShadow: true,
			dir: 'horizontal'
		},
		wgts: [
			{
				id: 'jsb-flow-adder-from',
				type: 'input',
				traits: [
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnFocus',
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnStartTyping',
					'experiments/jsonbuilder/traits/fuzzyDropdown/loadLookupValueOnTab',
					'experiments/jsonbuilder/traits/fuzzyDropdown/keyboardNavigator/index'
				],
				prps: {
					open: 'POPUP1',
					placeholder: 'from id',
					forceFocus: true,
					lookupData: ids,
					lookupFlows: [
						{ fromSubKey: 'id' }
					],
					lookupFilters: [
						{
							from: 'jsb-flow-adder-key',
							key: 'id',
							ignoreEmptyString: false,
							operator: 'contains'
						}
					],
					lookupPrps: {
						hoveredRow: 0,
						pageSize: 200
					}
				}
			},
			{
				id: 'jsb-flow-adder-fromKey',
				type: 'input',
				traits: [
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnFocus',
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnStartTyping',
					'experiments/jsonbuilder/traits/fuzzyDropdown/loadLookupValueOnTab',
					'experiments/jsonbuilder/traits/fuzzyDropdown/keyboardNavigator/index'
				],
				prps: {
					open: 'POPUP1',
					placeholder: 'from property',
					lookupData: keys,
					lookupFlows: [
						{ fromSubKey: 'key' }
					],
					lookupFilters: [
						{
							from: 'jsb-flow-adder-fromKey',
							key: 'key',
							ignoreEmptyString: false,
							operator: 'contains'
						}
					],
					lookupPrps: {
						hoveredRow: 0,
						pageSize: 200
					}
				}
			},
			{
				id: 'jsb-flow-adder-to',
				type: 'input',
				traits: [
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnFocus',
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnStartTyping',
					'experiments/jsonbuilder/traits/fuzzyDropdown/loadLookupValueOnTab',
					'experiments/jsonbuilder/traits/fuzzyDropdown/keyboardNavigator/index'
				],
				prps: {
					open: 'POPUP1',
					placeholder: 'to id',
					lookupData: ids,
					lookupFlows: [
						{ fromSubKey: 'id' }
					],
					lookupFilters: [
						{
							from: 'jsb-flow-adder-to',
							key: 'id',
							ignoreEmptyString: false,
							operator: 'contains'
						}
					],
					lookupPrps: {
						hoveredRow: 0,
						pageSize: 200
					}
				}
			},
			{
				id: 'jsb-flow-adder-toKey',
				type: 'input',
				traits: [
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnFocus',
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnStartTyping',
					'experiments/jsonbuilder/traits/saveFlowOnTab',
					'experiments/jsonbuilder/traits/fuzzyDropdown/keyboardNavigator/index'
				],
				prps: {
					open: 'POPUP1',
					placeholder: 'to property',
					lookupData: keys,
					lookupFlows: [
						{ fromSubKey: 'key' }
					],
					lookupFilters: [
						{
							from: 'jsb-flow-adder-toKey',
							key: 'key',
							ignoreEmptyString: false,
							operator: 'contains'
						}
					],
					lookupPrps: {
						hoveredRow: 0,
						pageSize: 200
					}
				}
			}
		]
	};

	return <ChildWgt mda={mda} />;
};

export default Component;
