import { createStore,  compose } from "redux";
import { reducers } from "./reducers";

const initial_state = {};

let middleware;
if (process.env.NODE_ENV !== "production") {
  middleware = compose(
    window.devToolsExtension && window.devToolsExtension()
  );
}
const store = createStore(reducers, initial_state, middleware);
export default store;
