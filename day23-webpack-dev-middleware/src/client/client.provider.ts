import { Injectable } from '@nestjs/common';
import { Configuration, Entry, EntryFunc } from 'webpack';
import webpack from 'webpack';
import { AbstractHttpAdapter } from '@nestjs/core';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

@Injectable()
export class ClientProvider {
  async register(app: AbstractHttpAdapter, config: Configuration) {
    const compiler = webpack({
      ...config,
      mode: 'development',
      entry: await this.appendHotMiddlewareToEntry(config.entry),
      plugins: [...config.plugins, new webpack.HotModuleReplacementPlugin()],
    });

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
  }

  private async appendHotMiddlewareToEntry(
    entry: string | string[] | Entry | EntryFunc,
  ) {
    const hot: string =
      'webpack-hot-middleware/client?reload=true&timeout=1000';
    let e = entry;
    e = e instanceof Function ? await e() : e;
    if (e instanceof Array) return [...(e as string[]), hot];
    else if (typeof e === 'string') return [e, hot];
    else {
      for (const key in e) {
        if (e[key] instanceof Array) e[key] = [...e[key], hot];
        else e[key] = [e[key], hot] as string[];
      }
      return e;
    }
  }
}
