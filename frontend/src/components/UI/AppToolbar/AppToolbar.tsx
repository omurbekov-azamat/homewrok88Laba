import React from 'react';
import {styled, AppBar, Toolbar, Grid, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                        <Link to="/posts">Forum</Link>
                    </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;