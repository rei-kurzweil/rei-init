globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_qFmh9TZQ.mjs';
import './chunks/astro/server_LGF5l_We.mjs';
import { s as sequence } from './chunks/index_wgsxIbQh.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
