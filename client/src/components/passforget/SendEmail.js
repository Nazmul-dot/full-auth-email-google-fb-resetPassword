import React, { useState } from 'react'
import {resetemailpass} from '../redux/user/userAction'
import {useDispatch} from 'react-redux'
const SendEmail = () => {
    const dispatch = useDispatch()
    const [data,setdata]=useState({
        email:''
    })
    const sendEmsil=(e)=>{
        e.preventDefault();
        // alert(data.email)
        dispatch(resetemailpass(data))
        setdata({
            email:''
        })
    }
    return (
        <>
            <div className='row'>
                <div className='col-md-10 mx-auto  d-flex justify-content-center align-items-center' style={{ height: '60vh', width: '100vw' }}>
                    <form action="" className='row w-100'>
                        <div className='col-sm-5 mx-auto  text-center'>
                            <h3>Forget password? send email</h3>
                        </div>
                        <div class="w-100"></div>
                        <div className='col-sm-5 mx-auto mb-3 '>
                            <input type="email" value={data.email} onChange={(e)=>setdata({...data,['email']:e.target.value})} class="form-control" id="formGroupExampleInput" placeholder="email" />
                        </div>
                        <div class="w-100"></div>
                        <div className='col-sm-5 mx-auto'>
                            <input onClick={sendEmsil} type="submit" class="form-control btn btn-info" id="formGroupExampleInput" placeholder="email" />
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default SendEmail
