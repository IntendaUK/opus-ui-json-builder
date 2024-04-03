//Components
import { JsonBuilder } from './components/jsonBuilder';

//PropSpecs
import propsJsonBuilder from './components/jsonBuilder/props';

import { registerComponentTypes } from '@intenda/opus-ui';

registerComponentTypes([{
	type: 'jsonBuilder',
	component: JsonBuilder,
	propSpec: propsJsonBuilder
}]);
