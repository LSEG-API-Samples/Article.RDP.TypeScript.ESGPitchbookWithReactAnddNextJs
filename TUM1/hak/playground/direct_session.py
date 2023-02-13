# This file does not require a running instance of Refinitiv Workspace
# but sends requests directly which (unfortunately) is orders of magnitude slower

import os
from dotenv import load_dotenv
import refinitiv.data as rd
import datetime


now = datetime.datetime.now()

load_dotenv()

appKey = os.environ['REFINITIV_APP_KEY']
userName = os.environ['REFINITIV_USER_NAME']
password = os.environ['REFINITIV_PASSWORD']

sess = rd.session.platform.Definition(
    'default',
    appKey,
    rd.session.platform.GrantPassword(username=userName, password=password),
).get_session()

sess.open()

rd.session.set_default(sess)

# rd.open_session()

df = rd.get_data(
    universe=['IBM.N', 'VOD.L'],
    fields=['BID', 'ASK', 'TR.Revenue']
)

print(df)

# rd.close_session()

sess.close()

done = datetime.datetime.now()
print(done - now)