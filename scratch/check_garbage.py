import requests
import json

url = "https://nrfketkwajzkmrlkvoyd.supabase.co/rest/v1/garbage_reminders?home_id=eq.39d5fe2e-4d0d-406a-82df-7cca5c5738c6"
headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZmtldGt3YWp6a21ybGt2b3lkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk2OTk5MSwiZXhwIjoyMDkxNTQ1OTkxfQ.7FkYNrMsDTD9-SUmJaq9lYJzkQ_zg8-IfinPe0peX78",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZmtldGt3YWp6a21ybGt2b3lkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk2OTk5MSwiZXhwIjoyMDkxNTQ1OTkxfQ.7FkYNrMsDTD9-SUmJaq9lYJzkQ_zg8-IfinPe0peX78"
}

response = requests.get(url, headers=headers)
data = response.json()

print(json.dumps(data, indent=2))
