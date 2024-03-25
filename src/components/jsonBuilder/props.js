//Props
const props = {
	cursorRow: { dft: 0 },
	tChangeCursorRow: { dft: 0 },
	tChangeMinimapRow: { dft: 0 },
	tOpenEditorKey: { dft: false },
	tOpenEditorValue: { dft: false },
	tSaveValue: { dft: false },
	tMagicAdd: { dft: false },
	tMagicAddWidget: { dft: false },
	tMagicAddFlow: { dft: false },
	tPropertyAdd: { dft: false },
	tWidgetAdd: { dft: false },
	tFlowAdd: { dft: false },
	tRowDelete: { dft: false },
	tWidgetDelete: { dft: false },
	tUndo: { dft: false },
	tRedo: { dft: false },
	tImport: { dft: false },
	tScriptAdd: { dft: false },
	addingScriptObject: { dft: false },
	addingScript: {},
	addingScriptTrigger: {},
	addingScriptAction: {},
	importing: { dft: false },
	addingPropertyObject: { },
	addingPropertyKey: { type: 'string' },
	addingPropertyValue: { type: 'string' },
	addingPropertyFocus: { type: 'string' },
	addingFlowObject: { },
	addingWidgetObject: { },
	json: { type: 'string' },
	jsonLines: { type: 'array of strings' },
	mda: { type: 'object' },
	mdaRows: { type: 'object' },
	jsonTreeNodes: { type: 'object' },
	jsonFlatList: { type: 'array' },
	cpnFlatList: { type: 'array' },
	tWidgetDuplicate: { dft: false },
	showPreview: {
		type: 'boolean',
		dft: false
	},
	history: {
		type: 'array',
		dft: () => []
	},
	historyIndex: {
		type: 'integer',
		dft: -1
	}
};

export default props;

