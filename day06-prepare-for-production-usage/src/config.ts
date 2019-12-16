import { LogLevel } from '@nestjs/common';

interface Config {
  logLevel: LogLevel[];
}

const develop: Config = {
  logLevel: ['debug', 'log', 'verbose', 'warn', 'error'],
};
const production: Config = {
  logLevel: ['log', 'verbose', 'warn', 'error'],
};

export const config =
  process.env.NODE_ENV === 'produiction' ? production : develop;
