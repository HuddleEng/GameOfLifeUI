/*
* You do not need to understand or change this file
*/

function boundLeft(index, size){
    const mod = index % size;
    return mod === (size-1) ? -1 : index;
}

function boundRight(index, size){
    const mod = index % size;
    return mod === 0 ? -1 : index;
}

function createCell(life){
    const cell = {
        willLive: false,
        alive: life
    };
    return cell;
}

function getLivingNeighbors(cell){
    let neighbors = 0;
    cell.environment.forEach(function(cell){
        if(cell && cell.alive){
            neighbors++;
        }
    });
    return neighbors;
}

export function createWorld(size, onCreate){
    const worldSize = size * size;
    const world = Array.from(new Array(worldSize), ()=>{
        const cell = createCell( Math.random()*100%6 > 2);
        onCreate && onCreate(cell);
        return cell;
    });

    world.forEach(function(cell, index){
        cell.environment = [
            world[ boundLeft(index-1, size) ],
            world[ boundLeft(index-size-1, size) ],
            world[ index-size ],
            world[ boundRight(index-size+1, size) ],
            world[ boundRight(index+1, size) ],
            world[ boundRight(index+size+1, size) ],
            world[ index+size ],
            world[ boundLeft(index+size-1, size) ]
        ];
    });
    return world;
}

export function updateWorld(world, cb){
    world.forEach(function(cell){
        const neighbors = getLivingNeighbors(cell);

        if(cell.alive && neighbors < 2){ // Under population.
            cell.willLive = false;
            return;
        }

        if(cell.alive && (neighbors === 2 || neighbors === 3)){ // Survival.
            cell.willLive = true;
            return;
        }

        if(cell.alive && (neighbors > 3)){ // Overpopulation.
            cell.willLive = false;
            return;
        }

        if (!cell.alive && neighbors === 3){ // Reproduction.
            cell.willLive = true;
            return;
        }

        cell.willLive = false;
    });

    world.forEach(function(cell, index){
        cell.alive = cell.willLive;
        cb(cell, index);
    });
}