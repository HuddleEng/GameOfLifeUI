const world = [];
const frag = document.createDocumentFragment();

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
	},
	init: function(elementId){
		document.addEventListener('DOMContentLoaded', () => {
			const element = document.getElementById(elementId);
			element.appendChild(frag);
		}, false);

	}
};
