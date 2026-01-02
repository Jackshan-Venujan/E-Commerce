import { Fragment, useEffect, useState } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {loading,error, isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        dispatch(login(email, password));
    };

    useEffect(() => {
        if(isAuthenticated){
            navigate('/');
        }

        if (error) {
            toast.error(error, {
                position:"bottom-center" ,
                type:'error',
                onOpen: () => {dispatch(clearAuthError)}
            });
        }
    }, [error, isAuthenticated,dispatch,navigate]);

    return (
        <Fragment>
            <MetaData title="Login" />
            <div className="row wrapper justify-content-center align-items-center vh-100">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg p-4" onSubmit={submitHandler}>
                        <h1 className="mb-4 text-center">Login</h1>
                        
                        <div className="form-group mb-3">
                            <label htmlFor="email_field" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-primary btn-block py-2"
                            disabled={loading}
                        >
                            LOGIN
                        </button>
                        <Link to="/register" className='"float-right mt-3'>New User ?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
