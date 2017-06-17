import redis;

def get_artist_database_client():
    """
    Returns a Redis client connected to DB storing cached artist data by artist name
    """

    return redis.StrictRedis(host='localhost', port=6379, db=0)

def get_related_artist_database_client():
    """
    Returns a Redis client connected to DB storing chached artist data by genre name
    """

    return redis.StrictRedis(host='localhost', port=6379, db=1)
