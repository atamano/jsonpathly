import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import builtins from 'rollup-plugin-node-builtins';
import 'core-js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { main, module } = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    builtins(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs({}),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
