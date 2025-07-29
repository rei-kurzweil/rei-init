import React from 'react'

interface ExampleProps {
  message?: string
}

const Example: React.FC<ExampleProps> = ({ message = 'Hello from rii-design-3d!' }) => {
  return (<div>{message}</div>)
}

export default Example
