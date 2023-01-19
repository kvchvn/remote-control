import { MainCommand, SubCommand } from './types.js';

export const parseData = (rawData: string) => {
  const [commands, ...params] = rawData.split(' ');

  const numParams = params.map((param) => Number(param));
  const splitCommands = commands.split('_');
  const mainCommand = splitCommands[0] as MainCommand;
  const subCommand = splitCommands[1] as SubCommand;

  return { mainCommand, subCommand, params: numParams };
};
