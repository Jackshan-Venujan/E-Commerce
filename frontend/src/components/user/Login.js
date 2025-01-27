import { Fragment, useEffect, useState } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {loading,error} = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Add your login logic 
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_CENTER,
        });
        return

        }

    }, [error]);

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
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
