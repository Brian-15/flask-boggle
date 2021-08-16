from boggle import Boggle
from flask import Flask, request, render_template, session, redirect, jsonify, flash
app = Flask(__name__)
app.config["SECRET_KEY"] = "happy_panda"

boggle_game = Boggle()

@app.before_first_request
def setup():
    session["board"] = boggle_game.make_board()
    session["highscore"] = session.get("highscore", 0)
    session["play_count"] = session.get("play_count", 0)

@app.route('/')
def home():
    return render_template("index.html",
                            board=session["board"],
                            highscore=session["highscore"],
                            play_count=session["play_count"]
                        )

@app.route('/guess', methods = ['POST'])
def guess():

    word = request.form["guess"]
    result = boggle_game.check_valid_word(session["board"], word)

    return jsonify(result=result)

@app.route('/game-over', methods=['POST'])
def game_over():
    data = request.get_json()
    session["highscore"] = int(data["highscore"])

    session["play_count"] += 1

    session["board"] = boggle_game.make_board()

    home()

    return jsonify(count=session["play_count"])
