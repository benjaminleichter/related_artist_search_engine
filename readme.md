## readme

1. Follow the instructions to install Flask and VirtualEnv if you don’t have them installed already.
    1. http://flask.pocoo.org/docs/0.12/installation/#
2. Make sure you have PIP installed for managing our Python dependencies
    1. https://pip.pypa.io/en/stable/installing/
3. Install NPM for managing our frontend dependencies
    1. https://docs.npmjs.com/getting-started/installing-node
4. Make sure you have webpack installed
    1. https://webpack.js.org/guides/installation/
5. Enter the project directory from the command line
6. Activate the virtual environment created in Step 1
    1. `source venv/bin/activate`
7. Install the Python dependencies
    1. `pip install -r requirements.txt`
8. Install the frontend dependencies
    1. `npm install 
9. Build client-side code
    1. `webpack`
10. Export the flask app
    1. `export FLASK_APP=app.py`
11. Start the project server
    1. `flask run`
12. Open a separate tab and run the redis server
    1. `./redis/redis-server ./redis/6379.conf`
13. Visit http://127.0.0.1:5000/