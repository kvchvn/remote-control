import WebSocket from 'ws';
import { MainCommand, SubCommand } from './types.js';

export const parseRawData = (rawData: WebSocket.RawData) => {
  const formattedRawData = rawData.toString().replace(/ /g, '_');
  const [commands, ...params] = rawData.toString().split(' ');

  const numParams = params.map((param) => Number(param));
  const splitCommands = commands.split('_');
  const mainCommand = splitCommands[0] as MainCommand;
  const subCommand = splitCommands[1] as SubCommand;

  return { mainCommand, subCommand, params: numParams, formattedRawData };
};
