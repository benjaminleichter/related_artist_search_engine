from flask import Flask, render_template, make_response
import json
import requests
import base64

from python.redis_utils import get_artist_database_client, get_related_artist_database_client

app = Flask(__name__)

@app.route('/')
def home():
    """
    Renders HTML file with mount point for React app.
    """

    return render_template('index.html')

@app.route('/search_artist_by_name/<string:artist_name>')
def search_artist_by_name(artist_name):
    """
    Searches Spotify API for artists matching given artist name
    """

    artist_database_client = get_artist_database_client()
    cached_artist_data = artist_database_client.get(artist_name)

    if cached_artist_data is None:
        access_token = _get_access_token()
        data = {
            'q': artist_name,
            'type': 'artist'
        }
        headers = {
            'Authorization': 'Bearer ' + access_token
        }
        response = requests.get(
            'https://api.spotify.com/v1/search',
            params=data,
            headers=headers)

        artists = response.json().get('artists', {})
        artist_database_client.set(artist_name, json.dumps(artists))
    else:
        artists = json.loads(cached_artist_data)

    return json.dumps({'artists': artists}), 200, {'ContentType':'application/json'}

@app.route('/search_related_artists_by_genre/<string:artist_name_to_exclude>/<string:genre>')
def search_related_artists_by_genre(artist_name_to_exclude, genre):
    """
    Searches Spotify API for artists matching the given genre and excluding the given artist name.
    """

    related_artist_database_client = get_related_artist_database_client()
    cached_genre_data = related_artist_database_client.get(artist_name_to_exclude)

    if cached_genre_data is None:
        access_token = _get_access_token()
        data = {
            'q': 'NOT "' + artist_name_to_exclude + '" genre:"' + genre + '"',
            'type': 'artist'
        }
        headers = {
            'Authorization': 'Bearer ' + access_token
        }
        response = requests.get(
            'https://api.spotify.com/v1/search',
            params=data,
            headers=headers)

        artists = response.json().get('artists', {})
        data_to_cache = {
            'genre': genre,
            'related_artists': artists
        }
        related_artist_database_client.set(artist_name_to_exclude, json.dumps(data_to_cache))
    else:
        artists = json.loads(cached_genre_data).get('related_artists', {})

    return json.dumps({'artists': artists}), 200, {'ContentType':'application/json'}

###################
# PRIVATE METHODS #
###################
def _get_access_token():
    """
    Retrieves access token from Spotify API
    """

    response = requests.post(
        'https://accounts.spotify.com/api/token',
        data={'grant_type': 'client_credentials'},
        auth=('d05f410a5bd847c98a20e042754baa60', '9985fc7eeda641d980e60a2ca57fdd9b'))

    access_token = response.json().get('access_token', None)

    if access_token is None:
        raise Exception('access_token unexpectedly missing')

    return access_token
