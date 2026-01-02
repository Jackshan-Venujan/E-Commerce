import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile, loadUser } from '../../actions/userActions';
import { clearUpdate } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';

export default function UpdateProfile() {
    const { user, error, isUpdated, loading } = useSelector(state => state.authState);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '/images/default_avatar.png');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user && user.name) {
            setName(user.name || '');
            setEmail(user.email || '');
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }
    }, [user]);

    useEffect(() => {
        if (isUpdated) {
            toast.success('Profile updated successfully!');
            dispatch(loadUser);
            dispatch(clearUpdate());
            navigate('/myprofile');
        }

        if (error) {
            toast.error(error);
            dispatch(clearUpdate());
        }
    }, [isUpdated, error, dispatch, navigate]);

    return (
        <Fragment>
            <MetaData title={'Update Profile'} />
            
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
                                type="text" 
                                id="name_field" 
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
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
                                        id='customFile'
                                        onChange={onChangeAvatar}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
