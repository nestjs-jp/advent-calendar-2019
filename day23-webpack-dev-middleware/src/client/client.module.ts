import { Module, DynamicModule, OnModuleInit, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { CLIENT_MODULE_OPTIONS } from './client-options.constant';
import { ClientOptions } from './client-options.interface';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ClientProvider } from './client.provider';

@Module({
  providers: [ClientProvider],
})
export class ClientModule implements OnModuleInit {
  constructor(
    @Inject(CLIENT_MODULE_OPTIONS)
    private readonly clientOptions: ClientOptions,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly clientProvider: ClientProvider,
  ) {}

  static forRoot(options: ClientOptions): DynamicModule {
    return process.env.NODE_ENV !== 'development'
      ? ServeStaticModule.forRoot(options)
      : {
          module: ClientModule,
          providers: [
            {
              provide: CLIENT_MODULE_OPTIONS,
              useValue: options,
            },
          ],
        };
  }

  public async onModuleInit() {
    if (process.env.NODE_ENV !== 'development') return;

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const { webpackConfig } = this.clientOptions;
    this.clientProvider.register(httpAdapter, webpackConfig);
  }
}
