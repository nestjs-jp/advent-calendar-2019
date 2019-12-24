import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { Configuration } from 'webpack';

export interface ClientOptions extends ServeStaticModuleOptions {
  webpackConfig: Configuration;
}
