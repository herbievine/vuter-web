import React from 'react'

interface DefaultWrapperProps {}

const DefaultWrapper: React.FC<DefaultWrapperProps> = ({ children }) => {
  return <div className="w-5/6 mx-auto flex justify-center">{children}</div>
}

export default DefaultWrapper
