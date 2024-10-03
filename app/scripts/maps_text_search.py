# import pandas as pd
# from google_apis import create_service

# client_secret_file = 'client-secret.json'
# API_NAME = 'places'
# API_VERSION = 'v1'
# SCOPES = ['https://www.googleapis.com/auth/cloud-platform']

# service = create_service(client_secret_file, API_NAME, API_VERSION, SCOPES)


# # print(dir(service.places()))
# # 'get', 'searchText'

# query= 'ramen'

# request_body = {
#     'textQuery': query,
#     'regionCode': 'US',
#     'locationBias': {
#         # 'circle': { # Circle defined by a center and radius
#         'rectangle': { # Box defined by two points––low point is SW and high point is NW
#             'low': {
#                 "latitude": 42.1111, "longitude": -72.3333
#             },
#             'high': {
#                 "latitude": 42.9999, "longitude": -70.9999
#             }
#         }
#         # }
#     },
#     'priceLevels': ['PRICE_LEVEL_EXPENSIVE']
# }

# response = service.places().searchText(
#     body=request_body,
#     fields="*"
# ).execute()

# places_list = response['places']
# # df = pd.DataFrame(places_list)
# df = pd.json_normalize(places_list)
# df.to_csv('places_results.csv', index=False)
# # print(df)
# # places_list[0]
