from flask import Flask, json, request
from woocommerce import API


app = Flask(__name__)

wcapi = API(
    url="http://localhost:8000",  # Your store URL
    consumer_key="ck_1372b10742e94833d31749784c2071d38f991f15",  # Your consumer key
    consumer_secret="cs_6edd9c5ce62e3db9a1a225bef0ef67f2882e7039",  # Your consumer secret
    wp_api=True,  # Enable the WP REST API integration
    version="wc/v3",  # WooCommerce WP REST API version
)


@app.route("/api/products", methods=["GET"])
def products():
    """ Returns a list of all the products """
    return json.jsonify(wcapi.get("products").json())


@app.route("/api/products/<product_id>", methods=["GET"])
def product_specific(product_id):
    """ Returns information about the product associated to the product_id """
    return json.jsonify(wcapi.get(f"products/{product_id}").json())


@app.route("/api/login", methods=["POST"])
def login():
    """ Endpoint to login users """
    user_data = request.get_json()
    username = user_data.get("username")
    password = user_data.get("password")
    # TODO: Find information about how sessions are managed
    #       by woocommerce, if nothing is found, it might be needed
    #       to handle it internally.
    return json.jsonify({"token": "slkjdlfkjalskdjf1234123"})
