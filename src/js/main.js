import { automation } from './automation.js';
import { checkBoxRenderer } from './checkboxrenderer.js';

automation.onCellCreate(checkBoxRenderer.createCell);
automation.onCellUpdate(checkBoxRenderer.drawCell);

checkBoxRenderer.init('boxElement1');

automation.start();