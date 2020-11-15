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

export default function Product(props) {
  const { product } = props;
  const classes = useStyles();
  const images = product.images;
  let imageUrl;
  if (images.length) {
    // If there is an image
    imageUrl = images[0].src;
  } else {
    imageUrl = ""; // TODO: Add a fall back image in case there isn't an image to show
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
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
