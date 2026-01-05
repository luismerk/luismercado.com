max_threads_count = ENV.fetch("RAILS_MAX_THREADS", 3)
min_threads_count = max_threads_count
threads min_threads_count, max_threads_count

workers ENV.fetch("WEB_CONCURRENCY", 1)

preload_app!

# THIS IS THE IMPORTANT PART
port ENV.fetch("PORT", 3000)
environment ENV.fetch("RAILS_ENV", "production")

plugin :tmp_restart
