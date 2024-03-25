/* eslint-disable max-lines-per-function, max-lines */

//System
import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import { JsonBuilder } from './components/jsonBuilder';

//PropSpecs
import propsJsonBuilder from './components/jsonBuilder/props';

//Opus Lib
import Opus from 'opus-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		registerComponentTypes={[{
			type: 'jsonBuilder',
			component: JsonBuilder,
			propSpec: propsJsonBuilder
		}]}
		startupMda={{
			type: 'containerSimple',
			prps: {
				singlePage: true,
				mainAxisAlign: 'center',
				crossAxisAlign: 'center'
			},
			wgts: [{
				type: 'jsonBuilder',
				prps: { json: '{}' }
			}]
		}}
	/>
);
