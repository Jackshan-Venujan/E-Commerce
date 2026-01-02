import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../actions/userActions';
import { clearUserCreated, clearError } from '../../slices/userSlice';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';

export default function NewUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");

    const { loading, isUserCreated, error } = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        dispatch(createUser(formData));
    }

    useEffect(() => {
        if (isUserCreated) {
            toast.success('User created successfully!');
            dispatch(clearUserCreated());
            navigate('/admin/users');
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isUserCreated, error, dispatch, navigate]);

    return (
        <Fragment>
            <MetaData title={'Create New User'} />
            <div className="row" style={{ margin: 0 }}>
                <div className="col-12 col-md-2" style={{ padding: 0 }}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5"> 
                            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mb-4">Create New User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength="8"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>
                                    <select 
                                        id="role_field" 
                                        className="form-control" 
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarPreview}
                                                    className='rounded-circle'
                                                    alt='Avatar Preview'
                                                />
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='avatar_upload'
                                                onChange={onAvatarChange}
                                            />
                                            <label className='custom-file-label' htmlFor='avatar_upload'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    id="create_button"
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-block py-3"
                                >
                                    CREATE USER
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
