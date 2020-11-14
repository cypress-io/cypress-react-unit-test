import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useCustomHook() {
  useDispatch()

  useEffect(() => {
    console.log('hello world!')
  }, [])
}
