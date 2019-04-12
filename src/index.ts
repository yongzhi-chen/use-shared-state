import {useState, useEffect} from 'react'

interface SetStatesWithNsInf {
  [key:string] : Function []
}

const STATE = {}

const setStatesWithNs : SetStatesWithNsInf = {}

function createSharedState(ns : string,  initState : any) {
  STATE[ns] = initState
  setStatesWithNs[ns] = []
}

function setSharedState(ns : string, newState : any) {
  const setStateFns = setStatesWithNs[ns]
  setStateFns.forEach(fn => fn(newState))
}

function useSharedState(ns : string) {
  if(STATE[ns] === undefined)
    throw(`The current namspace is not found. Please use createSharedState to create the state associated to namespace ${ns} first`)
  const [state, setState] = useState(STATE[ns])
  useEffect(() => {
    setStatesWithNs[ns].push(setState)
    return () => {
      setStatesWithNs[ns] = setStatesWithNs[ns].filter(d => d !== setState)
    }
  }, [])
  const newSetState = setSharedState.bind(null, ns)
  return [state, newSetState]
}

export  {createSharedState, useSharedState}
