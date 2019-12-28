import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import config from '@/webpack.config.client.js';
import { Configuration } from 'webpack';
import { getMetadataArgsStorage } from 'typeorm';
import { UserModule } from './user/user.module';
import ormConfig from '@/ormconfig.json';

const { cli, migrations, ...typeOrmConfig } = {
  ...ormConfig,
  entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
};

@Module({
  imports: [
    ClientModule.forRoot({
      renderPath: '/',
      rootPath: 'public',
      webpackConfig: config as Configuration,
    }),
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
