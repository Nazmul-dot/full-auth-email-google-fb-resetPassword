import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar } from '@material-ui/core'
const Navbar = () => {
    const { isAuthenticate } = useSelector(state => state.userData)
    return (
        <>
            <div className='container-fluid'>
                <div className='row bg-dark '>
                    <div className='col-md-10 mx-auto'>
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
                            <div class="container-fluid">
                                <Link class="navbar-brand" to="/">Navbar</Link>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav mb-2 mb-lg-0" style={{ marginLeft: 'auto' }}>

                                        {
                                            isAuthenticate ? (
                                                <>
                                                    <li class="nav-item">
                                                       <Avatar style={{backgroundColor:'red'}} >N</Avatar>
                                                    </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/">Home</Link>
                                                    </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/signout">SignOut</Link>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/signin">SignIn</Link>
                                                    </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/signup">SignUp</Link>
                                                    </li>
                                                </>
                                            )
                                        }





                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
