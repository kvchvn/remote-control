import { mouse, Point, straightTo } from '@nut-tree/nut-js';
import { ERRORS } from '../constants.js';
import { SubCommand } from '../types.js';

const drawRectangle = async ([width, height]: number[]) => {
  const initialPosition = await mouse.getPosition();
  await mouse.drag(straightTo(new Point(initialPosition.x, initialPosition.y + height)));
  await mouse.drag(straightTo(new Point(initialPosition.x + width, initialPosition.y + height)));
  await mouse.drag(straightTo(new Point(initialPosition.x + width, initialPosition.y)));
  await mouse.drag(straightTo(new Point(initialPosition.x, initialPosition.y)));
};

const handleDrawingCommands = async (subCommands: SubCommand, params: number[]) => {
  if (!params.length) {
    throw new Error(ERRORS.noParams);
  } else {
    switch (subCommands) {
      case 'rectangle':
        await drawRectangle(params);
        return;
      case 'square':
        await drawRectangle([params[0], params[0]]);
        return;
    }
  }
};

export default handleDrawingCommands;
