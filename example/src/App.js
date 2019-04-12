import React from 'react'
import {useSharedState, createSharedState} from 'use-shared-state'

createSharedState('app', {
  label : 'App'
})

createSharedState('other', 0)

const Child = props => {
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

const App = props => {

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
