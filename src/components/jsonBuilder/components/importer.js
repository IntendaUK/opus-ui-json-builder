/* eslint-disable max-lines-per-function */

//React
import React, { useContext } from 'react';

//System
import { createContext } from '@intenda/opus-ui';

//Context
const JsonBuilderContext = createContext('iconContext');

//Components
const Importer = () => {
	const { setState, ChildWgt, state: { importing } } = useContext(JsonBuilderContext);

	if (!importing)
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
				id: 'jsb-importer-input',
				type: 'input',
				prps: {
					dataType: 'file',
					flows: [{
						fromKey: 'file',
						toKey: 'fileString',
						mapFunction: v => {
							const reader = new FileReader();

							reader.onload = function (event) {
								setState({
									json: event.target.result,
									importing: false
								});
							};

							reader.readAsText(v);
						}
					}]
				}
			}
		]
	};

	return <ChildWgt mda={mda} />;
};

export default Importer;
