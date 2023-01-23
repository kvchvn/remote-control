export type MainCommand = 'mouse' | 'draw' | 'prnt';

type MouseSubCommand = 'up' | 'down' | 'left' | 'right' | 'position';

type DrawingSubCommand = 'circle' | 'rectangle' | 'square';

type PrintingSubCommand = 'scrn';

export type SubCommand = MouseSubCommand | DrawingSubCommand | PrintingSubCommand;
