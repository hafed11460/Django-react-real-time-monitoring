import React, { memo, useCallback, useEffect, useState } from "react"
import { FaPowerOff } from "react-icons/fa"

const PowerPort = memo(({ port, status, handleShutdownPort }) => {
  // console.log(`render powerPort component ${port}`)

  const [state, setState] = useState([])
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    setState(getStatus(status))
    setIsLoading(false)
  }, [status])



  const getStatus = useCallback((status) => {
    if (status === 'administratively') {
      return ['btn-outline-danger', false]
    } else if (status === 'up') {
      return ['btn-success', true]
    } else if (status === 'down') {
      return ['btn-outline-warning', true]
    }
    return ['btn-outline-warning', false]
  }, [status])

  return (
    <span
      onClick={() =>{
        setIsLoading(!isLoading)
        handleShutdownPort(port, state[1])
      }
    }
      className={`btn  ${state[0]}`}>
      {
        isLoading ?
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:
        <FaPowerOff />
      }
    </span>
  )
})

export default PowerPort;