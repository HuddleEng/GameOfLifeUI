const size = 48;
let triggerCellUpdate = () => {};
let triggerCellCreate = () => {};


function init(){
	const world = [];
	createCellCollection(world);
	makeCellsAware(world);
	startTime(world);
}

function startTime(world){
	setInterval(() => iterate(world), 100);
}

function boundLeft(index){
	const mod = index % size;
	return mod === (size-1) ? -1 : index;
}

function boundRight(index){
    const mod = index % size;
	return mod === 0 ? -1 : index;
}

function makeCellsAware(world){
	world.forEach(function(cell, index){
		cell.environment = [
			world[ boundLeft(index-1) ],
			world[ boundLeft(index-size-1) ],
			world[ index-size ],
			world[ boundRight(index-size+1) ],
			world[ boundRight(index+1) ],
			world[ boundRight(index+size+1) ],
			world[ index+size ],
			world[ boundLeft(index+size-1) ]
		];
	});
}

function createCellCollection(world){
    const worldSize = size * size;
	let i = 0;
	for (;i++<worldSize;){
        let cell = createCell( Math.random()*100%6 > 2 );
		triggerCellCreate(cell, i);
		world.push(cell);
	}
}

function createCell(life){
	return {
		willLive: false,
		alive: life
	};
}

function iterate(world){
	chooseLife(world);
	invokeChoice(world);
}

function chooseLife(world){
	world.forEach(function(cell){
		const neighbors = getNeighbors(cell);

		if(cell.alive && neighbors < 2){
			cell.willLive = false;
			return;
		}

		if(cell.alive && (neighbors === 2 || neighbors === 3)){
			cell.willLive = true;
			return;
		}

		if(cell.alive && (neighbors > 3)){
			cell.willLive = false;
			return;
		}

		if (!cell.alive && neighbors === 3){
			cell.willLive = true;
			return;
		}

		cell.willLive = false;
	});
}

function invokeChoice(world){
	world.forEach(function(cell, index){
		cell.alive = cell.willLive;
		triggerCellUpdate(cell, index);
	});
}

function getNeighbors(cell){
	let neighbors = 0;
	cell.environment.forEach(function(cell){
		if(cell && cell.alive){
			neighbors++;
		}
	});
	return neighbors;
}

export const automation = {
	onCellUpdate: (callback) => triggerCellUpdate = callback,
	onCellCreate: (callback) => triggerCellCreate = callback,
	size: () => size,
	start: init
};
