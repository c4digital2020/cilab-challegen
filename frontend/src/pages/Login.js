import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  form: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(3, 2),
  },
  paper: {
    padding: theme.spacing(2),
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "80%",
  },
  input: {
    marginTop: theme.spacing(1),
  },
}));

export default function Login() {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`/api/login`, { ...formData });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Controller
            as={TextField}
            name="username"
            label="Username"
            control={control}
            defaultValue=""
            className={classes.input}
          />

          <Controller
            as={TextField}
            name="password"
            label="Password"
            control={control}
            defaultValue=""
            type="password"
            className={classes.input}
          />

          <Button type="submit" variant="outlined" className={classes.input}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
