import { mouse, Point, straightTo } from '@nut-tree/nut-js';
import { ERRORS } from '../constants.js';
import { SubCommand } from '../types.js';

const drawRectangle = async ([width, height]: number[]) => {
  const mousePosition = await mouse.getPosition();
  await mouse.drag(straightTo(new Point(mousePosition.x, mousePosition.y + height)));
  await mouse.drag(straightTo(new Point(mousePosition.x + width, mousePosition.y + height)));
  await mouse.drag(straightTo(new Point(mousePosition.x + width, mousePosition.y)));
  await mouse.drag(straightTo(new Point(mousePosition.x, mousePosition.y)));
};

const drawCircle = async ([radius]: number[]) => {
  const mousePosition = await mouse.getPosition();
  const circleCenter = new Point(mousePosition.x - radius, mousePosition.y);

  let angle = 0;
  const pointsArray = [];
  const STEP = 0.01;
  while (angle <= 2 * Math.PI + STEP) {
    const point = new Point(
      circleCenter.x + radius * Math.cos(angle),
      circleCenter.y + radius * Math.sin(angle),
    );
    pointsArray.push(point);

    angle += STEP;
  }
  await mouse.drag(pointsArray);
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
      case 'circle':
        await drawCircle(params);
        return;
    }
  }
};

export default handleDrawingCommands;
