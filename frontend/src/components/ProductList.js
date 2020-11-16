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

export default function ProductList(props) {
  const { product } = props;
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
        <Button size="small" color="primary" className={classes.buttonAlign}>
          Add to shopping car
        </Button>
      </CardActions>
    </Card>
  );
}
