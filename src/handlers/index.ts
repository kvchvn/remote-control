import { MainCommand, SubCommand } from '../types.js';
import handleDrawingCommands from './drawing.js';
import handleMouseCommand from './mouse.js';

const handleCommands = async (
  mainCommand: MainCommand,
  subCommand: SubCommand,
  params: number[],
) => {
  switch (mainCommand) {
    case 'mouse':
      return await handleMouseCommand(subCommand, params);
    case 'draw':
      return await handleDrawingCommands(subCommand, params);
  }
};

export default handleCommands;
