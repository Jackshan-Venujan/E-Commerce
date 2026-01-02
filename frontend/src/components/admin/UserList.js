import { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';
import { getUsers, deleteUser } from '../../actions/userActions';
import { clearUserDeleted, clearError } from '../../slices/userSlice';

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState || {});
    const dispatch = useDispatch();

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Button onClick={() => deleteHandler(user._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
            return;
        }
        if(isUserDeleted) {
            toast.success('User deleted successfully!');
            dispatch(clearUserDeleted());
        }
        dispatch(getUsers);
    }, [dispatch, error, isUserDeleted])

    return (
        <Fragment>
            <MetaData title={'User List'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">User List</h1>
                    <div className="d-flex justify-content-end mb-3">
                        <Link to="/admin/user/new" className="btn btn-primary">
                            <i className="fa fa-plus"></i> Create User
                        </Link>
                    </div>
                    <Fragment>
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setUsers()}
                                bordered
                                striped
                                hover
                                className="px-3"
                                noBottomColumns
                            />
                        }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
