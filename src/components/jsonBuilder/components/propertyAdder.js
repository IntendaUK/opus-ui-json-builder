/* eslint-disable max-lines-per-function */

//React
import React, { useContext } from 'react';

//System
import { createContext, stateManager, getThemes } from 'opus-ui';

//Context
const JsonBuilderContext = createContext('iconContext');

//Helpers
const getKeys = obj => {
	if (!obj)
		return null;

	const propSpec = stateManager.getPropSpec(obj.type);

	const keys = Object.keys(propSpec)
		.filter(k => propSpec[k].internal !== true)
		.map(k => {
			return { key: k };
		});

	return keys;
};

const getValues = obj => {
	if (!obj)
		return null;

	const propSpec = stateManager.getPropSpec(obj.type);

	const values = [];

	Object.values(propSpec).forEach(p => {
		if (!p.options)
			return;

		values.push(...p.options.map(o => {
			return { value: o + '' };
		}));
	});

	const themes = getThemes();
	Object.values(themes).forEach(v => {
		values.push(...Object.keys(v).map(o => {
			return { value: o + '' };
		}));
	});

	return values;
};

//Events

//Components
const Component = () => {
	const { ChildWgt, state } = useContext(JsonBuilderContext);
	const {
		addingPropertyObject, addingPropertyKey,
		addingPropertyValue, addingPropertyFocus
	} = state;

	const properties = getKeys(addingPropertyObject);
	const values = getValues(addingPropertyObject);

	if (!addingPropertyObject)
		return null;

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
				id: 'jsb-property-adder-key',
				type: 'input',
				traits: [
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnFocus',
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnStartTyping',
					'experiments/jsonbuilder/traits/fuzzyDropdown/loadLookupValueOnTab',
					'experiments/jsonbuilder/traits/fuzzyDropdown/keyboardNavigator/index'
				],
				prps: {
					value: addingPropertyKey,
					open: 'POPUP1',
					placeholder: 'property name',
					forceFocus: addingPropertyFocus !== 'value',
					lookupData: properties,
					lookupFlows: [
						{ fromSubKey: 'key' }
					],
					lookupFilters: [
						{
							from: 'jsb-property-adder-key',
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
				id: 'jsb-property-adder-value',
				type: 'input',
				traits: [
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnFocus',
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnStartTyping',
					'experiments/jsonbuilder/traits/savePropertyOnTab',
					'experiments/jsonbuilder/traits/fuzzyDropdown/keyboardNavigator/index'
				],
				prps: {
					value: addingPropertyValue,
					open: 'POPUP1',
					placeholder: 'property name',
					forceFocus: addingPropertyFocus === 'value',
					lookupData: values,
					lookupFlows: [
						{ fromSubKey: 'value' }
					],
					lookupFilters: [
						{
							from: 'jsb-property-adder-value',
							key: 'value',
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
