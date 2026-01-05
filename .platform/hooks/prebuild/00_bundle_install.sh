#!/bin/bash
set -e

# Install gems in deployment mode
bundle config set deployment 'true'
bundle install --without development test --jobs 4 --retry 3
