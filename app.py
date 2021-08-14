from boggle import Boggle
from flask import Flask, request, render_template
app = Flask(__name__)

boggle_game = Boggle()

@app.route('/')
def home():
    render_template("board.html")