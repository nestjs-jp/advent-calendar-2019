import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { createConnection } from 'typeorm';
import { DatabaseController } from './database.controller';

@Module({
  providers: [
    {
      provide: DatabaseService.name,
      useFactory: async () => {
        const connection = await createConnection({
          type: 'mysql',
          host: '0.0.0.0',
          port: 3306,
          username: 'root',
          database: 'test',
        });
        return new DatabaseService(connection);
      },
    },
  ],
  controllers: [DatabaseController],
})
export class DatabaseModule {}
