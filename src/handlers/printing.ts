import { mouse, Region, screen } from '@nut-tree/nut-js';
import { PRINT_SCREEN_HEIGHT, PRINT_SCREEN_WIDTH } from '../constants.js';
import { SubCommand } from '../types.js';

const printScreenAndReturnBuffer = async () => {
  const mousePosition = await mouse.getPosition();
  const screenRegion = new Region(
    mousePosition.x - PRINT_SCREEN_WIDTH / 2,
    mousePosition.y - PRINT_SCREEN_HEIGHT / 2,
    PRINT_SCREEN_WIDTH,
    PRINT_SCREEN_HEIGHT,
  );
  const grabbedScreenRegion = await screen.grabRegion(screenRegion);
  const rgbGrabbedScreenRegion = await grabbedScreenRegion.toRGB();
  return { buffer: rgbGrabbedScreenRegion.data, pixelDensity: rgbGrabbedScreenRegion.pixelDensity };
};

export const handlePrintingCommands = async (subCommand: SubCommand) => {
  switch (subCommand) {
    case 'scrn':
      return await printScreenAndReturnBuffer();
  }
};
