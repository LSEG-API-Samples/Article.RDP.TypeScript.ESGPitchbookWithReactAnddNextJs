import os
from dotenv import load_dotenv
import refinitiv.data as rd
from session import connect_direct, connect_desktop

load_dotenv()

appKey = os.environ.get('REFINITIV_APP_KEY')
userName = os.environ.get('REFINITIV_USER_NAME')
password = os.environ.get('REFINITIV_PASSWORD')
connectDirect = os.environ.get('DIRECT') == 'true'

# get current time

if connectDirect:
    print('Connecting directly')
    connect_direct(appKey, userName, password)
else:
    print('Connecting via Refinitiv Workspace Desktop session')
    connect_desktop()

# Search for company given query
# https://apidocs.refinitiv.com/Apps/ApiDocs#/details/L2Rpc2NvdmVyeS9zZWFyY2hsaWdodC92MQ==/Lw==/POST/PLAYGROUND
resp = rd.content.search.Definition(
    query="Apple",
    view=rd.content.search.Views.EQUITY_QUOTES,
    select="DocumentTitle,RIC,PermID,PI"
).get_data().data.df

# For each company
for row in resp.itertuples():
    ric=row.RIC
    documentTitle=row.DocumentTitle
    print(f"{ric}: {documentTitle}")

    # Get ESG scores
    df = rd.get_data(
        universe=[ric],
        fields=[
            'TR.TRESGCScore',
            'TR.EnvironmentPillarScore',
            'TR.SocialPillarScore',
            'TR.GovernancePillarScore',
            'TR.TRESGCControversiesScore',
            'TR.TRESGResourceUseScore',
            'TR.TRESGEmissionsScore'
        ],
    )

    print(df)

    # TODO Create PDF
    


rd.close_session()