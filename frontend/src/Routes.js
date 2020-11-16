import Products from "./pages/Products";
import Product from "./pages/Product";
import Layout from "./pages/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// TODO: Make this nicer, cleaner, abstract the use of layout to a third party
export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/products/:productId">
          <Layout>
            <Product />
          </Layout>
        </Route>
        <Route path="/">
          <Layout>
            <Products />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}
