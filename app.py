from boggle import Boggle
from flask import Flask, request, render_template, session, redirect
app = Flask(__name__)
app.config["SECRET_KEY"] = "happy_panda"

boggle_game = Boggle()

@app.before_first_request
def setup():
    session["board"] = boggle_game.make_board()
    return redirect('/')

@app.route('/')
def home():
    return render_template("board.html", board=session["board"])