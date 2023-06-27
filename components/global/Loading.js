import React from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const Loading = () => {
  return (
    <div>
      <CircularProgress isIndeterminate color='pink.200' />
    </div>
  )
}

export default Loading;
