import os
import requests

DOMAIN_URL = "https://html.themehour.net/aior/demo/assets/img/"

for root, _, files in os.walk("."):
    for filename in files:
        if not filename.lower().endswith((".png", ".jpg", ".jpeg")):
            continue

        local_path = os.path.join(root, filename)

        # Convert "./service" -> "service"
        relative_dir = os.path.relpath(root, ".")

        if relative_dir == ".":
            url = DOMAIN_URL + filename
        else:
            url = f"{DOMAIN_URL}{relative_dir}/{filename}"

        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()

            with open(local_path, "wb") as f:
                f.write(response.content)

            print(f"Replaced: {local_path} <- {url}")

        except requests.RequestException as e:
            print(f"Failed: {url} -> {e}")