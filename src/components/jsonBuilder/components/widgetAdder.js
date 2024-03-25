/* eslint-disable max-lines-per-function */

//React
import React, { useContext } from 'react';

//System
import { createContext, getThemes } from 'opus-ui';

//Context
const JsonBuilderContext = createContext('iconContext');

//Helpers
const getComponentTypes = () => {
	const componentTheme = getThemes().components;

	const types = Object.keys(componentTheme)
		.map(t => {
			return { type: t };
		});

	return types;
};

//Events

//Components
const Component = () => {
	const { ChildWgt, state: { addingWidgetObject } } = useContext(JsonBuilderContext);

	if (!addingWidgetObject)
		return null;

	const componentTypes = getComponentTypes();

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
				id: 'jsb-widget-adder-type',
				type: 'input',
				traits: [
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnFocus',
					'experiments/jsonbuilder/traits/fuzzyDropdown/openLookupOnStartTyping',
					'experiments/jsonbuilder/traits/saveWidgetOnTab',
					'experiments/jsonbuilder/traits/fuzzyDropdown/keyboardNavigator/index'
				],
				prps: {
					open: 'POPUP1',
					forceFocus: true,
					placeholder: 'component type',
					lookupData: componentTypes,
					lookupFlows: [
						{ fromSubKey: 'type' }
					],
					lookupFilters: [
						{
							from: 'jsb-widget-adder-type',
							key: 'type',
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
