"""
MossyRealm Retro GIF Collector
Scrapes curated 90s-style GIF sources and filters for forest-friendly aesthetics.
"""

import os
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

# Curated sources - real vintage 90s GIF directories
SOURCE_URLS = [
    # 88x31 Button Directories
    "https://cyber.dabamos.de/88x31/",
    "https://anlucas.neocities.org/88x31Buttons.html",
    "https://blinkies.cafe/",
    "https://boop.sh/buttons/",
    # Pixel Aesthetic
    "https://pixel-soup.com/gifs/",
    "https://gifypet.neocities.org/",
    "https://cloverbell.neocities.org/graphics/",
    "https://sadgrl.online/webmastery/downloads/buttons/",
    "https://neonaut.neocities.org/buttons.html",
    # Nature and Vintage
    "https://gifcities.org/",
    "https://pixelsafari.neocities.org/",
    # Forest-Specific
    "https://forestroom.neocities.org/gifs/",
    "https://cottagecore.neocities.org/graphics/",
    "https://leafypixels.neocities.org/",
]

# Output to public/gifs for use in the site
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "gifs")

# Forest-friendly hue ranges (HSV hue values 0-360)
ALLOWED_HUES = [
    (60, 160),  # greens
    (20, 50),  # warm gold/amber
    (0, 30),  # browns/reds
    (160, 180),  # teal-ish greens
]

# Keywords that indicate forest/nature themed GIFs
GOOD_KEYWORDS = [
    "forest",
    "leaf",
    "moss",
    "tree",
    "nature",
    "mushroom",
    "lantern",
    "cozy",
    "cottage",
    "pixel",
    "tiny",
    "sprite",
    "flower",
    "plant",
    "fern",
    "wood",
    "cabin",
    "garden",
    "star",
    "moon",
    "divider",
    "button",
    "banner",
]

# Keywords to avoid (modern/off-theme)
BAD_KEYWORDS = [
    "anime",
    "kawaii",
    "neon",
    "cyber",
    "vaporwave",
    "glitch",
    "rainbow",
    "pride",
    "halloween",
    "christmas",
]


def get_dominant_hue(image):
    """Calculate the dominant hue of an image."""
    image = image.convert("RGB").resize((32, 32))
    pixels = list(image.getdata())
    hues = []

    for r, g, b in pixels:
        mx, mn = max(r, g, b), min(r, g, b)
        if mx == mn or mx == 0:
            continue
        # Calculate hue
        if mx == r:
            h = (60 * (g - b) / (mx - mn) + 360) % 360
        elif mx == g:
            h = (60 * (b - r) / (mx - mn) + 120) % 360
        else:
            h = (60 * (r - g) / (mx - mn) + 240) % 360
        hues.append(h)

    return sum(hues) / len(hues) if hues else None


def is_forest_friendly_color(hue):
    """Check if the hue falls within forest-friendly ranges."""
    if hue is None:
        return True  # Allow grayscale
    return any(low <= hue <= high for (low, high) in ALLOWED_HUES)


def has_good_filename(filename):
    """Check if filename suggests forest/nature theme."""
    fname_lower = filename.lower()
    # Reject if bad keywords
    if any(bad in fname_lower for bad in BAD_KEYWORDS):
        return False
    return True


def download_and_filter_gif(url, save_path):
    """Download a GIF and apply filters."""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return False, "HTTP error"

        # Check file size (max 500KB)
        if len(response.content) > 500 * 1024:
            return False, "Too large"

        img = Image.open(BytesIO(response.content))

        # Check format
        if img.format != "GIF":
            return False, "Not a GIF"

        # Check dimensions (max 400x400)
        if img.width > 400 or img.height > 400:
            return False, "Too big"

        # Color filter
        hue = get_dominant_hue(img)
        if not is_forest_friendly_color(hue):
            return False, "Wrong colors"

        # Save the GIF
        with open(save_path, "wb") as f:
            f.write(response.content)

        return True, "OK"

    except Exception as e:
        return False, str(e)[:30]


def crawl_source(base_url):
    """Crawl a single source URL for GIFs."""
    gifs_found = []

    try:
        response = requests.get(base_url, timeout=15)
        soup = BeautifulSoup(response.text, "html.parser")

        # Find all images
        for img in soup.find_all("img"):
            src = img.get("src")
            if not src:
                continue

            # Only process GIFs
            if not src.lower().endswith(".gif"):
                continue

            # Build full URL
            gif_url = urljoin(base_url, src)
            gifs_found.append(gif_url)

        # Also check for direct links to GIFs
        for link in soup.find_all("a"):
            href = link.get("href")
            if href and href.lower().endswith(".gif"):
                gif_url = urljoin(base_url, href)
                if gif_url not in gifs_found:
                    gifs_found.append(gif_url)

    except Exception as e:
        print(f"  Error crawling: {e}")

    return gifs_found


def main():
    """Main scraping function."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 50)
    print("MossyRealm Retro GIF Collector")
    print("=" * 50)
    print(f"Output: {os.path.abspath(OUTPUT_DIR)}")
    print()

    total_saved = 0
    total_skipped = 0

    for base_url in SOURCE_URLS:
        print(f"\nCrawling: {base_url}")
        print("-" * 40)

        gif_urls = crawl_source(base_url)
        print(f"  Found {len(gif_urls)} GIF links")

        for gif_url in gif_urls:
            filename = os.path.basename(urlparse(gif_url).path)

            # Skip if bad filename
            if not has_good_filename(filename):
                continue

            save_path = os.path.join(OUTPUT_DIR, filename)

            # Skip if already exists
            if os.path.exists(save_path):
                continue

            success, reason = download_and_filter_gif(gif_url, save_path)

            if success:
                print(f"  + Saved: {filename}")
                total_saved += 1
            else:
                print(f"  - Skipped: {filename} ({reason})")
                total_skipped += 1

    print()
    print("=" * 50)
    print(f"Done! Saved: {total_saved} | Skipped: {total_skipped}")
    print(f"Check: {os.path.abspath(OUTPUT_DIR)}")
    print("=" * 50)


if __name__ == "__main__":
    main()
