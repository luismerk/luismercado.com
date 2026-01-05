#!/bin/bash
# Ensure bundler installs gems before starting app
echo "Running bundle install..."
bundle install --deployment --without development test

echo "Bundle install completed."
