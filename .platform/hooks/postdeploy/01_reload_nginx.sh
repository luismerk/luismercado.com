#!/usr/bin/env bash
set -e

systemctl reload nginx
echo "Nginx reloaded successfully."
