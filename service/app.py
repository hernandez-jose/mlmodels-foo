from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/sklearn", methods=['POST'])
def generate_sklearn_code():
    data = request.json
    return "<p>Hello, World!</p>"
