import React, { ReactChildren, ReactChild } from 'react'

export const Button = ({
  children,
  ...rest
}: {
  children: ReactChildren | ReactChild
}) => {
  return <button {...rest}>{children}</button>
}
