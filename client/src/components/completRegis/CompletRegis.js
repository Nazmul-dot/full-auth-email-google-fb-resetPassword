import React from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import {userRagisterConfirm} from '../redux/user/userAction'
import {useDispatch} from 'react-redux'
const CompletRegis = () => {
    const {token}=useParams()
    const dispatch = useDispatch()
    const activate=()=>{
        dispatch(userRagisterConfirm(token))
    }
    return (
        <>
           <div style={{height:'100vh',width:'100vw'}} className='d-flex justify-content-center align-items-center flex-column'>
               <Link to="/signin" className='btn btn-info mb-5' onClick={activate}>Active Ragistration</Link>
               <p>Or SingUp again</p>
               <Link to="/signup" className='mt-1' style={{textDecoration:'none'}}>singUp</Link>
           </div>

        </>
    )
}

export default CompletRegis
