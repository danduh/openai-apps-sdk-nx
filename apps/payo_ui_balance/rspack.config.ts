import { NxAppRspackPlugin } from '@nx/rspack/app-plugin.js';
import { NxReactRspackPlugin } from '@nx/rspack/react-plugin.js';
import {
  NxModuleFederationPlugin,
  // NxModuleFederationDevServerPlugin,
} from '@nx/module-federation/rspack.js';
import { join } from 'path';

import config from './module-federation.config';

export default {
  output: {
    path: join(__dirname, '../../dist/payo_ui_balance'),
    publicPath: 'auto',
  },
  devServer: {
    port: 4200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    },
  },
  plugins: [
    new NxAppRspackPlugin({
      tsConfig: './tsconfig.app.json',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/openapi-apps/payo_ui_balance/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactRspackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
    new NxModuleFederationPlugin(
      { config },
      { dts: false }
    ),
    // Commenting out dev server plugin as it's causing issues
    // new NxModuleFederationDevServerPlugin({ 
    //   config,
    //   devServerConfig: {
    //     host: 'localhost',
    //   }
    // }),
  ],
};
