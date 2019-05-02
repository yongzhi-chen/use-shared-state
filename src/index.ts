import {useState, useEffect} from 'react'

interface SetStatesWithNsInf {
  [key:string] : React.Dispatch<React.SetStateAction<any>> []
}

const STATE = {}

const setStatesWithNs: SetStatesWithNsInf = {}

function createSharedState<T>(ns : string,  initState: T) {
  STATE[ns] = initState
  setStatesWithNs[ns] = []
  
  const useCurrentNsState = function() {
    return useSharedState<T>(ns)
  }
  return useCurrentNsState
}

function setSharedState<T>(ns: string, newState: React.SetStateAction<T>) {
  const setStateFns = setStatesWithNs[ns]
  setStateFns.forEach(fn => fn(newState))
  STATE[ns] = newState
}

function useSharedState<T>(ns: string): [T, (newState: React.SetStateAction<T>) => void] {
  if(STATE[ns] === undefined)
    throw(new Error(`The current namspace is not found. Please use createSharedState to create the state associated to namespace ${ns} first`))
  const [state, setState] = useState<T>(STATE[ns])
  useEffect(() => {
    setStatesWithNs[ns].push(setState)
    return () => {
      setStatesWithNs[ns] = setStatesWithNs[ns].filter(d => d !== setState)
    }
  }, [])
  const newSetState = function(newState: React.SetStateAction<T>) {
    setSharedState<T>(ns, newState)
  }
  return [state, newSetState]
}

export  {createSharedState, useSharedState}


