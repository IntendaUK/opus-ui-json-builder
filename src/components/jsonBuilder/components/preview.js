//React
import React, { useContext } from 'react';

//System
import { createContext } from 'opus-ui';

//Context
const JsonBuilderContext = createContext('iconContext');

//Components
const Component = () => {
	const { ChildWgt, state: { showPreview, mda } } = useContext(JsonBuilderContext);

	if (!showPreview)
		return null;

	const mdaPreview = {
		type: 'container',
		container: 'SYSMODAL',
		prps: {
			padding: true,
			autoChildMargins: true,
			backgroundColor: 'iconPrimary',
			hasShadow: true,
			dir: 'horizontal'
		},
		wgts: [
			mda
		]
	};

	return <ChildWgt mda={mdaPreview} />;
};

export default Component;
