
from db import get_cached_mongo_db

def user_is_verified(user_id):
    """check if the user_id finish account link
    :param user_id: line user id
    :return: True/False
    """
    activity_db = get_cached_mongo_db()
    user_collect = activity_db['user_info']

    ret = False
    user = user_collect.find_one({'user': user_id})
    if user in user:
        ret = True

    return ret