import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async selectAll(): Promise<string> {
    const res = await this.databaseService.connection.query(
      `SELECT message FROM helloworld`,
    );
    return res[0].message;
  }
}
