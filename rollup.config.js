import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
import zip from 'rollup-plugin-zip'
import replace from '@rollup/plugin-replace'

import postcss from 'rollup-plugin-postcss'
import tailwindcss from 'tailwindcss'
import tailwindConfig from './tailwind.config.js';

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: path.join('chunks', '[name]-[hash].js'),
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development'),
      preventAssignment: true
    }),
    // eslint({}),
    chromeExtension(),
    postcss({
      extensions: ['.css', '.module.css'],
      plugins: [
        require('postcss-import'),
        tailwindcss(tailwindConfig)
      ]
    }),
    simpleReloader(),
    resolve({
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    emptyDir(),
    isProduction && zip({ dir: 'releases' }),
  ]
}
