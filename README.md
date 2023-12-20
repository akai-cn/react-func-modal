# react-func-modal

[![NPM version](https://img.shields.io/npm/v/react-func-modal.svg?style=flat)](https://npmjs.org/package/react-func-modal)
[![NPM downloads](http://img.shields.io/npm/dm/react-func-modal.svg?style=flat)](https://npmjs.org/package/react-func-modal)

## Install

```bash
$ yarn add react-func-modal
```

## Example

```
import Modal from 'react-func-modal';
import YourWidget from 'your-component-path';

Modal.show({
   name: 'allotment',    // plan A need register
   component: YourWidget // plan B
   onOk: () => {},
   params: {
   }
})
```

## LICENSE

MIT
