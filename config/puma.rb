# config/puma.rb

# Bind to EB's $PORT (Amazon Linux 2023 expects TCP)
port ENV.fetch("PORT") { 3000 }

# Rails environment
environment ENV.fetch("RAILS_ENV") { "production" }

# Workers and threads (safe for small instances)
workers ENV.fetch("WEB_CONCURRENCY") { 1 }
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count

# Preload app for performance
preload_app!

# Do NOT bind to a Unix socket
# Remove any old lines like: bind "unix:///var/run/puma/my_app.sock"
# EB handles the web server proxying to Puma via TCP on $PORT
