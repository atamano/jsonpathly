/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// Universal build configuration - works in both Node.js and browsers
const buildConfig = (format) => ({
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: format === 'esm' ? 'index.mjs' : 'index.cjs',
    chunkFormat: format === 'esm' ? 'module' : 'commonjs',
    library: {
      type: format === 'esm' ? 'module' : 'commonjs',
    },
    globalObject: 'this', // Works in both Node.js and browsers
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [],
  plugins: [],
  devtool: 'source-map',
  experiments: {
    outputModule: format === 'esm',
  },
});

module.exports = [
  buildConfig('cjs'),  // CommonJS for require()
  buildConfig('esm'),  // ES Module for import
];
