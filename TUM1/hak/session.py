import refinitiv.data as rd
import datetime

def connect_direct(appkey, username, password):
    now = datetime.datetime.now()

    sess = rd.session.platform.Definition(
        'default',
        appkey,
        rd.session.platform.GrantPassword(username=username, password=password),
    ).get_session()

    sess.open()

    rd.session.set_default(sess)

    print(f"opened session in {datetime.datetime.now() - now}")

    return sess


def connect_desktop():
    now = datetime.datetime.now()

    rd.open_session()

    print(f"opened session in {datetime.datetime.now() - now}")

    return rd.session.get_default()
