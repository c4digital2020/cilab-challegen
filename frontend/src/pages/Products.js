import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import { Grid } from "@material-ui/core";

function Products() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchAsync = async () => {
      const response = await axios.get("/api/products");
      setProduct(response.data);
    };
    fetchAsync();
  }, []);

  return (
    <>
      {product.map((prod) => (
        <Grid item key={prod.id}>
          <ProductList product={prod} />
        </Grid>
      ))}
    </>
  );
}

export default Products;
