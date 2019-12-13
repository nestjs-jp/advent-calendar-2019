import { AppModule } from './app.module';
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
  {
    path: '/v1',
    module: AppModule
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AppModule
  ],
})
export class V1Module { }
