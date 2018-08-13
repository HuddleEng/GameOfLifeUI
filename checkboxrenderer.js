const world = [];
const frag = document.createDocumentFragment();
let size;

export const checkBoxRenderer = {
	drawCell: function(cell, index){
		if(world[index]){
			const state = cell.alive ? 'checked' : false;
			world[index].checked = state;
		}
	},
	createCell: function(cell, index){
		const checkbox = document.createElement( 'input' );

		checkbox.type = 'checkbox';
		checkbox.checked = true;
		checkbox.className = 'render__chk_cell';

		frag.appendChild(checkbox);
        world.push(checkbox);

		if(index % size === 0){
			frag.appendChild( document.createElement( 'br' ) );
		}
	},
	init: function(id, worldSize){
		size = worldSize;
		document.addEventListener('DOMContentLoaded', () => {
			const element = document.getElementById(id);
			element.appendChild(frag);
		}, false);

	}
};
