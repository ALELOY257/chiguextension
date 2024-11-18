import requests
import json
import base64

url_id = base64.urlsafe_b64encode("https://x.com/?lang=es".encode()).decode().strip("=")
print(url_id)

url = "https://www.virustotal.com/api/v3/urls/"+url_id
print(url)

headers = {
    "accept": "application/json",
    "x-apikey": "5bb389eb66d9e09c19a952a49f0cc6cad7f8857818ac7a0154aadcb33b2bc955"
}

response = requests.get(url, headers=headers)


print(response.text)