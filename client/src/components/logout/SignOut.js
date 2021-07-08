import React, { useEffect } from 'react'
import {userLogout} from '../redux/user/userAction'
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from 'react-router'
const SignOut = () => {
    const dispatch = useDispatch()
    const history=useHistory()
    useEffect(()=>{
        dispatch(userLogout())
        history.push('/signin')
    },[])
    return (
        <div>
            logout
        </div>
    )
}

export default SignOut
