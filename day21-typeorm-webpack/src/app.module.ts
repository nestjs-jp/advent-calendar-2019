import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { getMetadataArgsStorage } from 'typeorm';
import ormConfig from '../ormconfig.json';

const { cli, migrations, ...typeOrmConfig } = {
  ...ormConfig,
  entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
};

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
