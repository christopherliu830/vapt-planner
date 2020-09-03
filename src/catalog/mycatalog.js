import {Catalog} from 'react-planner';
import * as Areas from './areas/area/planner-element.jsx';
import * as Lines from './lines/wall/planner-element.jsx';
import * as Items from './items/bench/planner-element.jsx';

let catalog = new Catalog();

for( let x in Areas ) catalog.registerElement( Areas[x] );
for( let x in Lines ) catalog.registerElement( Lines[x] );
for( let x in Items ) catalog.registerElement( Items[x] );

export default catalog;
