# 📚Generation react icon component

[![npm version](https://img.shields.io/npm/v/gensvgc.svg?style=flat)](https://www.npmjs.com/package/gensvgc)

#### Generate function with import svg's and (react/react-native) Icon component using folder. Just specify the path to the icons and the path where to generate the component, and the package will do everything for you!

## Installation

Npm:
```bash
npm install -D gensvgc
```

Yarn:
```bash
yarn add -D gensvgc
```

## Usage

Run this command:
```bash
npx gensvgc icons
```

#### The only first required argument is the directory where all svg files are located. 
#### The second argument is the directory where the component will be created.


## CLI Options

For all possible commands, run `npx gensvgc --help`.

### `--watch` (`-w`)

- **Type**: `boolean`
- **Default**: `false`
- **Example**: `npx gensvgc icons --watch`

Keep track of adding / changing / deleting files. Nesting is also supported

## License

MIT Licensed. Copyright (c) Victor Razdorov 2024.
