# tchatche-react

A react port of the [tchatche](https://www.npmjs.com/package/tchatche) conversational bot UI.

## Install
```bash
# npm
npm install @creadi/tchatche-react

# yarn
yarn add @creadi/tchatche-react
```

## Usage

```tsx
import React from 'react'
import Tchatche from '@creadi/tchatche-react'
import { BotMessage } from '@creadi/tchatche-react/dist/types'

const messages: BotMessage[] = [
  // ...
]

const onEnd = (({ conversation, data }) => {
  // ...
})

export default <Tchatche messages={messages} onEnd={onEnd} pace={300} />
```

Find a more thorough explanation of the structure of `BotMessage` [here](https://www.npmjs.com/package/tchatche)

## Release new version
- A release on github will automatically trigger npm publishing. Make sure versions are in sync.
