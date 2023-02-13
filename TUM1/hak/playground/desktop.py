# This file uses an existing Refinitiv Workspace desktop session
# to send requests, which is faster than sending direct requests

from dotenv import load_dotenv
import refinitiv.data as rd

# get current time
import datetime
now = datetime.datetime.now()

load_dotenv()

rd.open_session()

df = rd.get_data(
    universe=['AAPL.O'],
    fields=['BID', 'ASK', 'TR.Revenue']
)

rd.close_session()

done = datetime.datetime.now()

elapsed = done - now
print(elapsed)