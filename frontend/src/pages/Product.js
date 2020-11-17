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
import { connect } from "react-redux";
import { addProduct, removeProduct } from "../actions/Product";

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

// FIXME: This might not be needed
// Comment Section for the products
// Currently is not being used
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

function PurchaseButton(props) {
  const {
    purchaseProducts,
    product: productProp,
    onRemove,
    onPurchase,
    ...extraProps
  } = props;
  const bought = (product) => {
    // Returns true if the product passed as an argument is in the list of
    // purchaseProducts
    return !!purchaseProducts.filter((prod) => product.id === prod.id).length;
  };
  return bought(productProp) ? (
    <Button {...extraProps} variant="contained" color="secondary" onClick={onRemove}>
      Remove
    </Button>
  ) : (
    <Button {...extraProps} onClick={onPurchase}>
      Purchase
    </Button>
  );
}

function ProductDetails(props) {
  const { product, onPurchase, onRemove, purchaseProducts } = props;
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
      <PurchaseButton
        variant="outlined"
        color="primary"
        className={classes.button}
        // XXX: There is a little of prop drilling here, which might become a problem later 👀
        onPurchase={onPurchase}
        onRemove={onRemove}
        purchaseProducts={purchaseProducts}
        product={product}
      />
    </div>
  );
}

function Product(props) {
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

  const addProduct = () => {
    props.addProduct(product);
  };
  const removeProduct = () => {
    props.removeProduct(product);
  };
  return !product ? ( // If product hasn't loaded
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <>
      <Grid container>
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
          <ProductDetails
            product={product}
            onPurchase={addProduct}
            onRemove={removeProduct}
            purchaseProducts={props.products.addedToCart}
          />
        </Grid>
      </Grid>
      {
        // <CommentSection />
      }
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: function (product) {
    dispatch(addProduct(product));
  },
  removeProduct: function (product) {
    dispatch(removeProduct(product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
