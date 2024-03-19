import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/main.js', // Adjust this path to your source file
    output: {
      file: 'dist/main.js', // Adjust the output file as needed
      format: 'esm', // Universal Module Definition
      name: 'CryptoPayButton', // Exposed global variable when included via script tag
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env'],
      }),
      copy({
        targets: [
          { src: 'style.css', dest: 'dist/' },
          { src: 'src/assets/*', dest: 'dist/assets/' } // Copy all images
        ]
      })
    ],
  };
  