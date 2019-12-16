import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { Logger } from '@nestjs/common';

export function requestLogger(
  logger: Logger,
): (req: ExpressRequest, res: ExpressResponse, next: () => void) => void {
  return (req, res, next): void => {
    res.on('finish', (): void => {
      logger.verbose(`${req.method} ${req.url} -> ${res.statusCode}`);
    });
    next();
  };
}
