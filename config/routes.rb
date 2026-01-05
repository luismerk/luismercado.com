Rails.application.routes.draw do
  root 'pages#home'
  # Catch-all for React Router, but only after assets are served
  get "*path", to: "pages#home", constraints: ->(req) do
    !req.path.start_with?("/assets")
  end
end