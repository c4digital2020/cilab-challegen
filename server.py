from flask import Flask, json
from woocommerce import API



app = Flask(__name__)

wcapi = API(
    url="http://localhost:8000", # Your store URL
    consumer_key="ck_1372b10742e94833d31749784c2071d38f991f15", # Your consumer key
    consumer_secret="cs_6edd9c5ce62e3db9a1a225bef0ef67f2882e7039", # Your consumer secret
    wp_api=True, # Enable the WP REST API integration
    version="wc/v3" # WooCommerce WP REST API version
)


@app.route("/api/products", methods=["GET"])
def products():
    return json.jsonify(wcapi.get("products").json())
