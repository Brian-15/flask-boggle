from unittest import TestCase
from app import app
from flask import session, json
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    # def test_setup(self):
    #     with app.test_client() as client:
    #         res = client.get('/')
    #         html = res.get_data(as_text = True)
    #         self.assertEqual(res.status_code, 200)
    #         self.assertIn()
    #     return
            

    # def tearDown(self):
    #     print("TEST TEAR DOWN")

    def test_home(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = Boggle().make_board()
                change_session['highscore'] = 0
                change_session['play_count'] = 0

            res = client.get('/')
            # html = res.get_data(as_text = True)
            self.assertEqual(res.status_code, 200)

    def test_guess(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = Boggle().make_board()

            res = client.post('/guess', data={'guess': 'xyz'})
            res_data = res.get_json()
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res_data["result"], "not-word")

    def test_game_over(self):
        with app.test_client() as client:
            res = client.post('/game-over', 
                                data=json.dumps({'highscore': 100}),
                                content_type='application/json'
                            )
            self.assertEqual(res.status_code, 200)
            self.assertEqual(session["play_count"], 1)
            self.assertEqual(session["highscore"], 100)

