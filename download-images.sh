#!/bin/sh
# Downloads the photo set into assets/img/ (run from this folder). Replace these with your own photos if you prefer.
mkdir -p assets/img
while read -r url dest; do
  [ -f "$dest" ] || curl -fsSL "$url" -o "$dest" || echo "FAILED: $url"
done < images.txt
echo done
