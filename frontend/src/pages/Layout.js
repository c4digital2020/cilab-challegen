import { Grid } from "@material-ui/core";
import NavBar from "../components/NavBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: theme.spacing(2),
  },
}));

function Layout(props) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid className={classes.gridContainer} container spacing={2}>
        {props.children}
      </Grid>
    </Grid>
  );
}

export default Layout;
