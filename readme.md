## readme

1. Follow the instructions to install Flask if you don’t have it installed already. Note that you don’t have to create a virtual env as one is already created in the project.
    1. http://flask.pocoo.org/docs/0.12/installation/#
2. Make sure you have PIP installed for managing our Python dependencies
    1. https://pip.pypa.io/en/stable/installing/
3. Install NPM for managing our frontend dependencies
    1. https://docs.npmjs.com/getting-started/installing-node
4. Enter the project directory from the command line
5. Activate the virtual environment
    1. `source venv/bin/activate`
6. Install the Python dependencies
    1. `pip install -r requirements.txt`
7. Install the frontend dependencies
    1. `npm install 
8. Build frontend
    1. `webpack`
9. Export the flask app
    1. `export FLASK_APP=app.py`
10. Start the project server
    1. `flask run`
11. Open a separate tab and run the redis server
    1. `./redis/redis-server ./redis/6379.conf`
12. Visit http://127.0.0.1:5000/