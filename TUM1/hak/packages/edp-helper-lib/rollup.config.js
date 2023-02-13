import  resolve  from 'rollup-plugin-node-resolve';
import  typescript  from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',
  output: [{
    name: "EDPHelper",
    file: './dist/EDPHelper.js',
    format: 'umd'
  }
    // , {
    //     name: "EDPHelperModule",
    //     file: './dist/EDPHelperModule.js',
    //     format: 'esm'
    // }
  ],
  plugins: [
    resolve(),
    typescript({
      clean: true
    }),
    terser({
      // https://github.com/terser-js/terser#minify-options
      compress: {},
      output: {},
      // https://github.com/mishoo/UglifyJS2/issues/1753
      mangle: {
        safari10: true
      }
    })
  ]

};
