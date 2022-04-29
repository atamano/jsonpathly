import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';
import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        name: 'jsonpathly',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        name: 'jsonpathly',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), ts({ tsconfig: 'tsconfig.json' }), commonjs()],
  },
];
