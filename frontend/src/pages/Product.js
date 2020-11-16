import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  image: {
    height: "80%",
    width: "80%",
  },
  description: {
    height: "80%",
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2, 4),
  },
  root: {
    flexGrow: 1,
  },
}));

function CommentSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function ProductDetails(product) {
  const classes = useStyles();
  return (
    <div className={classes.description}>
      <Typography
        variant="h5"
        dangerouslySetInnerHTML={{ __html: product.name }}
      ></Typography>
      <Typography
        variant="subtitle1"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      <Typography variant="subtitle1">
        Price:
        <span dangerouslySetInnerHTML={{ __html: product.price_html }}></span>
      </Typography>
      <Button variant="outlined" color="primary" className={classes.button}>
        Purchase
      </Button>
    </div>
  );
}

function Products() {
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchAsync = async (id) => {
      // Fetch infoormation for specific product
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    };
    fetchAsync(productId);
  }, [productId]);

  console.log(product);
  return !product ? ( // If product hasn't loaded
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <>
      <Grid container spacing={4}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            {
              // Display image
              // TODO: consider if the product doesn't have an Image
            }
            <img className={classes.image} src={product.images[0].src} />
          </Grid>
          <Grid item sm={6}>
            {
              // Display information
            }
            <ProductDetails {...product} />
          </Grid>
        </Grid>
      </Grid>
      {
        // Comments for the product
      }
      <CommentSection />
    </>
  );
}

export default Products;
