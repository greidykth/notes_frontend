import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Icon = ({css, icon}) => {
  return (
    <FontAwesomeIcon className={css} icon={icon} />
  )
}

export default Icon
