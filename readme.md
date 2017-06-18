## readme

1. Follow the instructions bellow to install Flask if you don’t have it installed already. Note that you don’t have to create a virtual env as one is already created in the project.
    1. http://flask.pocoo.org/docs/0.12/installation/#
2. Make sure you have PIP installed for managing our Python packages
    1. https://pip.pypa.io/en/stable/installing/
3. Enter the project directory from the command line
4. Activate the virtual environment
    1. `source venv/bin/activate`
5. Install the Python dependencies
    1. `pip install -r requirements.txt`
6. Export the flask app
    1. `export FLASK_APP=app.py`
7. Start the project server
    1. `flask run`
8. Open a separate tab and run the redis server
    1. `./redis/redis-server ./redis/6379.conf`
9. Visit http://127.0.0.1:5000/