#!/bin/sh
set -e

API_URL="${VITE_API_URL:-http://localhost:8000/api}"

find /usr/share/nginx/html -type f \( -name "*.js" -o -name "*.html" \) -exec sed -i "s|__VITE_API_URL__|$API_URL|g" {} +

exec nginx -g "daemon off;"
