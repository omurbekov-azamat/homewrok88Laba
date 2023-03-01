import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectLogoutLoading} from "../../../features/user/usersSlice";
import {logout} from "../../../features/user/usersThunks";
import {useNavigate} from "react-router-dom";
import {Button, Menu, MenuItem} from '@mui/material';
import {User} from '../../../types';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLogoutLoading);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        await navigate('/posts');
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Add new post</MenuItem>
                <MenuItem onClick={handleLogout} disabled={loading}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;