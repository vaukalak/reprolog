# React Property Logger

Configurable logger for all property changes of your componets.

![](https://github.com/vaukalak/reprolog/blob/master/ezgif-3-836c024d83.gif?raw=true)

## Install

```
npm i -S reprolog
```
or
```
yarn add reprolog
```

## Setup

```
import React from 'react';
import { LoggerProvider } from 'reprolog';
import { newOldDiffLogger } from 'reprolog/loggers';
import { consoleTableOutput } from 'reprolog/outputs';
import Root from './Root';

export default () => (
    <LoggerProvider
      propsLogger={newOldDiffLogger(consoleTableOutput())}
      propsLoggerConfig={{ whiteList: ['Root'] }}
    >
        <Root />
    </LoggerProvider>
);
```

## Usage

```
// Root.js
import React from 'react';
import { withLogger } = 'reprolog';

const Root = ({ foo }) => (
    <div>{foo}</div>
);

export default withLogger()(Root);
```

`withLogger` api links your component to properties. It accepts `name` parameter.
This is the name with which component will appear in the log. By default it
value is taken from the component display name. 

## Configuration

With a high probability you do not need logs from all your components in the same time.
To enable logs that you need to display, just modify `whiteList` param of config passed to logger provider.

## Runtime Configuration

You can configure logger, for runtime updates from chrome console:
```
import React from 'react';
import ReactDOM from 'react-dom';

import { LoggerProvider } from 'reprolog';
import { newOldDiffLogger } from 'reprolog/loggers';
import { consoleTableOutput } from 'reprolog/outputs';
import { ConsoleRuntimeConfig } from 'reprolog/config';

import Counter from './Counter';

const config = new ConsoleRuntimeConfig({ whiteList: ['Counter'] });

const Root = () => (
  <LoggerProvider
    propsLogger={newOldDiffLogger(consoleTableOutput())}
    propsLoggerConfig={config}
  >
    <Counter />
  </LoggerProvider>
);
```

This will expose a gobal `reprolog` object, that can be called from chrome console, with 2 methods:
### updateWhiteList(whiteList, save);
Changes logging whiteList to the firt parameter. The second mentions whether update should be saved in local storage. I case `save` is true, updated config will be also used after app refresh.
### dropCache
Remove updates saved to local storage.

## Performance

On production environment `withLogger` behaves as identity function, and logs are off.
For that reason it has zero performance impact on production environment.

## Loggers and outputs

Loggers are responsible to format and data to display. Right now there:

`newOldDiffLogger` - displays new, old properties, and property diff on each update.
`newPropsLogger` - displays only new properties on each update.
`newDiffPropsLogger` - displays new deteled, added properties and properties diff on each update.

Outputs display data provided by loggers. Right now there `consoleOutput` which logs
data as plain console object. And `consoleTableOutput` which displays data in a table layout
(depends on `console.table` api).
