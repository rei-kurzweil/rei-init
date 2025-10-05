// Ensure React is available for SSR
import React from 'react';
import { renderToString } from 'react-dom/server';

// Make React globally available
(globalThis as any).React = React;

export { React, renderToString };