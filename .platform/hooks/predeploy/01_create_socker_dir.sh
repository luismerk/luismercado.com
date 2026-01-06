#!/bin/bash
mkdir -p /var/run/puma
chown webapp:webapp /var/run/puma
chmod 755 /var/run/puma
echo "Created /var/run/puma directory with appropriate permissions."

mkdir -p /var/pids
chown webapp:webapp /var/pids
chmod 755 /var/pids
echo "Created /var/pids directory with appropriate permissions."
