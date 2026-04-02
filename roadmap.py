import json, re, sys
import requests
from bs4 import BeautifulSoup

username = sys.argv[1]
soup = BeautifulSoup(requests.get(f"https://roadmap.sh/u/{username}").text, "html.parser")

results = []
for btn in soup.find_all("button", class_=re.compile(r"group")):
    name_el = btn.find("span", class_=re.compile(r"grow truncate"))
    pct_el  = btn.find("span", class_=re.compile(r"text-xs"))
    if name_el and pct_el:
        name = name_el.get_text(strip=True)
        pct  = re.search(r"\d+", pct_el.get_text())
        if name and pct:
            results.append({"skill": name, "percent": int(pct.group())})

output = json.dumps(results, indent=2)
print(output)

with open(f"{username}_roadmap.json", "w") as f:
    f.write(output)
