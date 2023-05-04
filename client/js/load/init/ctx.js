import Collection from '/js/lib/collection/collection.js';
import Workspace from '/js/abstractions/workspace/workspace.js';

const 
   workspace = new Workspace();

const collections = {
   models: new Collection(),
};

const controls = {

};

window.INTELLITHING = {
   collections,
   workspace,
   controls,
};

export default INTELLITHING;