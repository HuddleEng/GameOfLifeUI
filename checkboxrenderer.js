var checkBoxRenderer = (function(){
	
	var size;
	var world = [];
	var frag = document.createDocumentFragment();

	return {
		drawCell: function(cell, index){
			var state;
			if(world[index]){
			state = cell.alive ? 'checked' : false;
			world[index].checked = state;
			}
		},
		createCell: function(cell, index){
			var checkbox;

			world.push(checkbox = document.createElement( 'input' ));
			
			checkbox.type = 'checkbox';
			checkbox.checked = 'checked';
			checkbox.className = 'render__chk_cell';
			
			frag.appendChild(checkbox);

			if(index % size === 0){
				frag.appendChild( document.createElement( 'br' ) );
			}
		},
		init: function(id, worldSize){
			size = worldSize;
			document.addEventListener('DOMContentLoaded', function(){
				var element = document.getElementById(id);
				element.appendChild(frag);  
			}, false);
			
		}
	};
}());