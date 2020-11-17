import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";

import { addProduct, removeProduct } from "../actions/Product";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  centerPrice: {
    textAlign: "center",
  },
  buttonAlign: {
    marginLeft: "auto",
  },
});

// NOTE: A big part of this code is copied from "../pages/Product" find a way to
//       extract it apart.
function AddShoppingCartButton(props) {
  const {
    purchaseProducts,
    product: productProp,
    onRemove,
    onPurchase,
  } = props;
  const classes = useStyles();
  const bought = (product) => {
    // Returns true if the product passed as an argument is in the list of
    // purchaseProducts
    return !!purchaseProducts.filter((prod) => product.id === prod.id).length;
  };
  return bought(productProp) ? (
    <Button
      size="small"
      color="secondary"
      variant="contained"
      onClick={onRemove}
      className={classes.buttonAlign}
    >
      Remove from shopping cart
    </Button>
  ) : (
    <Button
      size="small"
      color="primary"
      onClick={onPurchase}
      className={classes.buttonAlign}
    >
      Add to shopping cart
    </Button>
  );
}

function ProductList(props) {
  const { product, addProduct, removeProduct, products } = props;
  const [redirect, setRedirect] = useState("");
  const classes = useStyles();
  const images = product.images;
  let imageUrl;
  if (images.length) {
    // If there is an image
    imageUrl = images[0].src;
  } else {
    imageUrl = ""; // TODO: Add a fall back image in case there isn't an image to show
  }
  const open = (id) => {
    setRedirect(`/products/${id}`);
  };
  const onPurchase = () => {
    addProduct(product);
  };
  const onRemove = () => {
    removeProduct(product);
  };
  // XXX: Checks if redirect has been set, empty by default.
  //     if empty shows a list of all the products
  //     otherwise (if set to some url) then it should redirect the user to it
  return !!redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          open(product.id);
        }}
      >
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></Typography>
          <Typography className={classes.centerPrice} variant="subtitle2">
            Price: ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddShoppingCartButton
          onPurchase={onPurchase}
          onRemove={onRemove}
          product={product}
          purchaseProducts={products.addedToCart}
        />
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: function (product) {
    console.log("Add Product");
    dispatch(addProduct(product));
  },
  removeProduct: function (product) {
    console.log("Remove Product");
    dispatch(removeProduct(product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
