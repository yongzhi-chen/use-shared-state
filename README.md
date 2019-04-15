# use-shared-state

Use shared state with namespace using react hook in your function components.

[![NPM](https://img.shields.io/npm/v/use-shared-state.svg)](https://www.npmjs.com/package/use-shared-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @mirror/use-shared-state
```

## Demo
https://codesandbox.io/s/zl814j09mp

## Usage

```jsx
import React from 'react'
import {useSharedState, createSharedState} from '@mirror/use-shared-state'

createSharedState('app', {
  label : 'App'
})

createSharedState('other', 0)

const Child = () => {
  const [appLabel, setAppLabel] = useSharedState('app')
  const [sharedCnt, setSharedCnt] = useSharedState('other')
  
  return (
    <div>
      <p>{sharedCnt}</p>
      <div>
        <button onClick={() => setSharedCnt(sharedCnt + 1)}>Inc</button>
      </div>
      <input value={appLabel.label} onChange={e => setAppLabel({label : e.target.value})} />
    </div>
  )
}

const App = () => {

  const [appLabel, setAppLabel] = useSharedState('app')
  return (
    <div>
      <h1>{appLabel.label}</h1>
      <Child />
      <Child />
    </div>
  )
}

export default App

```

## Api

```tsx
createSharedState(namespace : string, initState : any) => void
```
Create a shared state associated to given namespace. If you call useSharedState(ns) with namespace that has not been created, an error will be thrown. 

```tsx
useSharedState(namespace : string) => [sharedState, setSharedState]
```
Return sharedState and its set function associated to the namespace. 

## License

MIT © [yongzhi-chen](https://github.com/yongzhi-chen)
