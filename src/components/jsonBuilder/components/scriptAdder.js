/* eslint-disable max-lines-per-function, max-lines */

//React
import React, { useContext, useEffect } from 'react';

//System
import { createContext, configActions, configTriggers } from '@intenda/opus-ui';

//Context
const JsonBuilderContext = createContext('iconContext');

//Events
const onSetup = ({ setState, state: { addingScriptObject } }) => {
	if (!addingScriptObject)
		return;

	setState({
		addingScript: {
			id: '',
			triggers: [
				{ event: 'onStateChange' },
				{ event: 'onMount' }
			],
			actions: [
				{ type: 'setState' },
				{ type: 'log' }
			]
		}
	}
	);
};

const onSave = ({ setState, getWgtState, state: { mda, addingScriptObject, addingScript } }) => {
	if (!addingScriptObject.prps.scps)
		addingScriptObject.prps.scps = [];

	const id = getWgtState('jsb-script-added-id').value;
	addingScript.id = id;

	addingScriptObject.prps.scps.push(addingScript);

	const json = JSON.stringify(mda);

	setState({
		deleteKeys: ['addingScriptObject'],
		json
	});
};

//Helpers
const getMdaTriggers = ({ state: { addingScript } }) => {
	return {
		type: 'container',
		prps: {
			autoChildMargins: true,
			dir: 'horizontal'
		},
		wgts: addingScript.triggers.map(t => {
			return {
				type: 'container',
				prps: {
					padding: true,
					paddingSize: 'tinyPadding',
					backgroundColor: 'monokaiBlue',
					canClick: true,
					fireScript: {
						actions: [{
							type: 'setMultiState',
							target: 'jsb',
							value: {
								deleteKeys: ['addingScriptAction'],
								addingScriptTrigger: t
							}
						}]
					}
				},
				wgts: [
					{
						type: 'label',
						prps: { cpt: t.event }
					}
				]
			};
		})
	};
};

const getMdaActions = ({ state: { addingScript } }) => {
	return {
		type: 'container',
		prps: {
			autoChildMargins: true,
			dir: 'horizontal'
		},
		wgts: addingScript.actions.map(a => {
			return {
				type: 'container',
				prps: {
					padding: true,
					paddingSize: 'tinyPadding',
					backgroundColor: 'monokaiGreen',
					canClick: true,
					fireScript: {
						actions: [{
							type: 'setMultiState',
							target: 'jsb',
							value: {
								deleteKeys: ['addingScriptTrigger'],
								addingScriptAction: a
							}
						}]
					}
				},
				wgts: [
					{
						type: 'label',
						prps: { cpt: a.type }
					}
				]
			};
		})
	};
};

const getMdaEditTrigger = ({ state: { addingScriptTrigger } }) => {
	if (!addingScriptTrigger)
		return null;

	const { event, ...rest } = addingScriptTrigger;

	const config = configTriggers.find(c => c.event === event);

	return [{
		type: 'label',
		prps: { cpt: addingScriptTrigger.event }
	}, ...config.keys.map(k => {
		return {
			type: 'input',
			prps: {
				placeholder: k.key,
				value: rest[k.key]
			}
		};
	})];
};

const getMdaEditAction = ({ setState, state: { addingScriptAction, addingScript } }) => {
	if (!addingScriptAction)
		return null;

	const { type, ...rest } = addingScriptAction;

	const config = configActions.find(c => c.type === type);

	return [{
		type: 'label',
		prps: { cpt: addingScriptAction.type }
	}, ...config.keys.map(k => {
		return {
			type: 'input',
			prps: {
				placeholder: k.key,
				value: rest[k.key],
				flows: [{
					toKey: 'hack',
					mapFunction: v => {
						addingScriptAction[k.key] = v;

						setState({ addingScript });
					}
				}]
			}
		};
	})];
};

//Components
const Component = () => {
	const props = useContext(JsonBuilderContext);
	const { getHandler, ChildWgt, state: { addingScriptObject, addingScript } } = props;

	useEffect(getHandler(onSetup), [!!addingScriptObject]);

	if (!addingScriptObject || !addingScript)
		return null;

	const mdaTriggers = getMdaTriggers(props);
	const mdaActions = getMdaActions(props);
	const mdaEditor = getMdaEditTrigger(props) || getMdaEditAction(props) || [];

	const mda = {
		type: 'containerSimple',
		container: 'SYSMODAL',
		prps: {
			dir: 'vertical',
			hasShadow: 'true',
			padding: 'true',
			autoChildMargins: 'true',
			backgroundColor: 'iconPrimary'
		},
		wgts: [
			{
				type: 'containerSimple',
				prps: {
					dir: 'horizontal',
					autoChildMargins: 'true'
				},
				wgts: [
					{
						type: 'containerSimple',
						prps: {
							dir: 'vertical',
							autoChildMargins: 'true'
						},
						wgts: [
							{
								type: 'containerSimple',
								prps: {
									dir: 'horizontal',
									autoChildMargins: 'true'
								},
								wgts: [
									{
										type: 'label',
										prps: { cpt: 'id' }
									},
									{
										id: 'jsb-script-added-id',
										type: 'input',
										prps: { placeholder: '...' }
									}
								]
							},
							{
								type: 'containerSimple',
								prps: {
									dir: 'horizontal',
									autoChildMargins: 'true'
								},
								wgts: [
									{
										type: 'label',
										prps: { cpt: 'triggers' }
									},
									mdaTriggers
								]
							},
							{
								type: 'containerSimple',
								prps: {
									dir: 'horizontal',
									autoChildMargins: 'true'
								},
								wgts: [
									{
										type: 'label',
										prps: { cpt: 'actions' }
									},
									mdaActions
								]
							}
						]
					},
					{
						type: 'containerSimple',
						prps: {
							autoChildMargins: true,
							backgroundColor: 'lightGrey',
							padding: true
						},
						wgts: mdaEditor
					}
				]
			},
			{
				type: 'containerSimple',
				prps: {
					dir: 'horizontal',
					mainAxisAlign: 'end',
					autoChildMargins: 'true'
				},
				wgts: [
					{
						type: 'button',
						prps: {
							color: 'monokaiRed',
							padding: 'true',
							cpt: 'Cancel',
							shadow: true,
							prpsLabel: { color: 'monokaiFg' }
						}
					},
					{
						type: 'button',
						prps: {
							color: 'monokaiGreen',
							padding: 'true',
							cpt: 'Save',
							shadow: true,
							prpsLabel: { color: 'monokaiBg' },
							handlerOnClick: getHandler(onSave)
						}
					}
				]
			}
		]
	};

	return <ChildWgt mda={mda} />;
};

export default Component;
