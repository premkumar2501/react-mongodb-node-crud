import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/Context'

export const Input = ({placeholder,width,height, setValue}) => {
    const {value} = useContext(AuthContext)
    console.log(value,'context value');
    
    
  return (
    <div>
        <input type="text" placeholder={placeholder} style={{
            widows:width, height:height, borderRadius:10
        }} onChange={setValue} />
    </div>
  )
}
