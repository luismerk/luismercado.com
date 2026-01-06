#!/bin/bash
mkdir -p /var/run/puma
chown webapp:webapp /var/run/puma
chmod 755 /var/run/puma
echo "Created /var/run/puma directory with appropriate permissions."
