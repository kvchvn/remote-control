import { down, left, mouse, right, up } from '@nut-tree/nut-js';
import { ERRORS } from '../constants.js';
import { SubCommand } from '../types.js';

const handleMouseCommand = async (subCommand: SubCommand, params: number[]) => {
  if (!params.length) {
    if (subCommand === 'position') {
      const point = await mouse.getPosition();
      return `${point.x},${point.y}`;
    } else {
      throw new Error(ERRORS.noParams);
    }
  } else {
    const [step] = params;

    switch (subCommand) {
      case 'up':
        await mouse.move(up(step));
        return;
      case 'down':
        await mouse.move(down(step));
        return;
      case 'left':
        await mouse.move(left(step));
        return;
      case 'right':
        await mouse.move(right(step));
        return;
    }
  }
};

export default handleMouseCommand;
