Rails.application.routes.draw do

  root 'users#show'

  resources :searches

  match 'auth/twitter/callback', to: 'sessions#create', via: [:get, :post]
# need to test/check on failure route
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  
end
