Rails.application.routes.draw do

  root 'main#index'

  # TODO: pull out only routes you are using
  resources :searches, :users, :main

  match 'auth/twitter/callback', to: 'sessions#create', via: [:get, :post]
# need to test/check on failure route
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  
end
