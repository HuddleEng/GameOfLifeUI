import {createWorld, updateWorld} from './gol.js';

const size = 48;

let onUpdate = () => {};
let onCreate = () => {};

function init(){
    const world = createWorld(size, onCreate);

    setInterval(() => {
        updateWorld(world, onUpdate);
    }, 66);
}

export const automation = {
    onCellUpdate: (callback) => onUpdate = callback,
    onCellCreate: (callback) => onCreate = callback,
    start: init
};
