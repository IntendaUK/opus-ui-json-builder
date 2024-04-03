/* eslint-disable max-lines-per-function */

//React
import React, { useEffect } from 'react';

//System
import { createContext } from '@intenda/opus-ui';

//Events
import onLoadJson from './events/onLoadJson';
import { onOpenEditorKey, onOpenEditorValue } from './events/onOpenEditor';
import onSaveValue from './events/onSaveValue';
import onBuildRows from './events/onBuildRows';
import onMagicAdd from './events/onMagicAdd';
import onMagicAddWidget from './events/onMagicAddWidget';
import onMagicAddFlow from './events/onMagicAddFlow';
import onPropertyAdd from './events/onPropertyAdd';
import onWidgetAdd from './events/onWidgetAdd';
import onFlowAdd from './events/onFlowAdd';
import onChangeCursorRow from './events/onChangeCursorRow';
import onChangeMinimapRow from './events/onChangeMinimapRow';
import onRowDelete from './events/onRowDelete';
import onWidgetDelete from './events/onWidgetDelete';
import onWidgetDuplicate from './events/onWidgetDuplicate';
import onUndo from './events/onUndo';
import onRedo from './events/onRedo';
import onTrackHistory from './events/onTrackHistory';
import onImport from './events/onImport';
import onScriptAdd from './events/onScriptAdd';

//Components
import Minimap from './components/minimap';
import Importer from './components/importer';
import Preview from './components/preview';
import PropertyAdder from './components/propertyAdder';
import WidgetAdder from './components/widgetAdder';
import FlowAdder from './components/flowAdder';
import ScriptAdder from './components/scriptAdder';

//Styles
import './styles.css';

const JsonBuilderContext = createContext('iconContext');

//Components
const Inner = React.memo(({ props }) => {
	const { ChildWgt, state: { mdaRows } } = props;
	if (!mdaRows)
		return null;

	return <ChildWgt mda={mdaRows} />;
}, ({ props: propsA }, { props: propsB }) => {
	return JSON.stringify(propsA.state.mdaRows) === JSON.stringify(propsB.state.mdaRows);
});

export const JsonBuilder = props => {
	const { id, style, classNames, getHandler, attributes, state } = props;
	useEffect(getHandler(onLoadJson), [state.json]);
	useEffect(getHandler(onTrackHistory), [state.json]);

	const delta = state.jsonFlatList?.map(n => n.text).join('');
	useEffect(getHandler(onBuildRows), [delta]);

	useEffect(getHandler(onChangeCursorRow), [state.tChangeCursorRow]);
	useEffect(getHandler(onChangeMinimapRow), [state.tChangeMinimapRow]);

	useEffect(getHandler(onOpenEditorKey), [state.tOpenEditorKey]);
	useEffect(getHandler(onOpenEditorValue), [state.tOpenEditorValue]);
	useEffect(getHandler(onSaveValue), [state.tSaveValue]);

	useEffect(getHandler(onMagicAdd), [state.tMagicAdd]);
	useEffect(getHandler(onPropertyAdd), [state.tPropertyAdd]);

	useEffect(getHandler(onMagicAddWidget), [state.tMagicAddWidget]);
	useEffect(getHandler(onWidgetAdd), [state.tWidgetAdd]);

	useEffect(getHandler(onMagicAddFlow), [state.tMagicAddFlow]);
	useEffect(getHandler(onFlowAdd), [state.tFlowAdd]);

	useEffect(getHandler(onScriptAdd), [state.tScriptAdd]);

	useEffect(getHandler(onWidgetDelete), [state.tWidgetDelete]);
	useEffect(getHandler(onRowDelete), [state.tRowDelete]);

	useEffect(getHandler(onWidgetDuplicate), [state.tWidgetDuplicate]);

	useEffect(getHandler(onUndo), [state.tUndo]);
	useEffect(getHandler(onRedo), [state.tRedo]);

	useEffect(getHandler(onImport), [state.tImport]);

	return (
		<JsonBuilderContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
			>
				<Inner props={props} />
				<Minimap />
				<Importer />
				<Preview />
				<PropertyAdder />
				<WidgetAdder />
				<FlowAdder />
				<ScriptAdder />
			</div>
		</JsonBuilderContext.Provider>
	);
};
