import { Grid } from '@material-ui/core';

function Layout(props){
    return (
        <Grid container spacing={2}>
            { props.children }
        </Grid>
    )
}

export default Layout;
