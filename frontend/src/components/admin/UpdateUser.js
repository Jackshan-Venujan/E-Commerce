import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';
import { getUser, updateUser } from '../../actions/userActions';
import { clearUserUpdated, clearError } from '../../slices/userSlice';

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const { loading, user = {}, error, isUserUpdated } = useSelector(state => state.userState);

    useEffect(() => {
        if (user._id && user._id !== id) {
            dispatch(getUser(id));
        }
        
        if (user._id) {
            setName(user.name || '');
            setEmail(user.email || '');
            setRole(user.role || '');
        }
        
        if (isUserUpdated) {
            toast.success('User updated successfully!');
            dispatch(clearUserUpdated());
            navigate('/admin/users');
        }
        
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, id, error, user, isUserUpdated, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        
        dispatch(updateUser(id, formData));
    }

    return (
        <Fragment>
            <MetaData title={'Update User'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form onSubmit={submitHandler} className="shadow-lg">
                                <h1 className="mb-4">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>
                                    <select 
                                        className="form-control" 
                                        id="role_field"
                                        onChange={e => setRole(e.target.value)}
                                        value={role}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <button
                                    id="update_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading}
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
