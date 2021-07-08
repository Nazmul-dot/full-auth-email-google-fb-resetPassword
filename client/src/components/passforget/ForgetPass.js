import React, { useState } from 'react'
import {resetPssword} from '../redux/user/userAction'
import {useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
const ForgetPass = () => {
    const dispatch = useDispatch()
    const {token}=useParams()
    const [data,setdata]=useState({
        password:'',
        comfirm_password:'',
        token:token
    })
    const handlechange=(e)=>{
        const value=e.target.value;
        const name=e.target.name;
        setdata({...data,[name]:value})
    }
    const {password,comfirm_password}=data;
    const submit=(e)=>{
        e.preventDefault();
        // console.log(data)
        dispatch(resetPssword(data))
        setdata({
            password:'',
            comfirm_password:'',
            token:''
        })
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-10 mx-auto  d-flex justify-content-center align-items-center' style={{ height: '60vh', width: '100vw' }}>

                        <form className='row w-100'>
                            <div className='col-sm-3 mb-3 mx-auto '>
                               <h4>ResetPassword</h4>
                            </div>
                            <div className='w-100'></div>
                            <div className='col-sm-3 mb-3 mx-auto '>
                                <input name='password' value={password} onChange={handlechange} type="password" class="form-control" id="formGroupExampleInput" placeholder='password' />
                            </div>
                            <div className='w-100'></div>
                            <div className='col-sm-3 mb-3 mx-auto '>
                                <input name='comfirm_password' value={comfirm_password} onChange={handlechange} type="password" class="form-control" id="formGroupExampleInput" placeholder='comfirm password' />
                            </div>
                            <div className='w-100'></div>
                            <div className='col-sm-3 mb-3 mx-auto '>
                                <input onClick={submit} type="submit" value='resetPassword' class="form-control btn btn-dark" id="formGroupExampleInput" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPass
