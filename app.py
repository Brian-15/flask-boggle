from boggle import Boggle
from flask import Flask, request, render_template, session, redirect, jsonify, flash
app = Flask(__name__)
app.config["SECRET_KEY"] = "happy_panda"

boggle_game = Boggle()

@app.before_first_request
def setup():
    session["board"] = boggle_game.make_board()

@app.route('/')
def home():
    return render_template("index.html", board=session["board"])

@app.route('/guess', methods = ['POST'])
def guess():
    print(request.form["guess"])

    word = request.form["guess"]
    result = boggle_game.check_valid_word(session["board"], word)

    return jsonify(result=result)

# @app.route('/end-game')
# def end_game():
