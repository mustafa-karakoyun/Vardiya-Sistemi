Rails.application.routes.draw do
  # API-specific routes
  namespace :api do
    namespace :v1 do
      resources :shifts
      resources :schedules
    end
  end

  # Devise routes scoped under /api/v1
  # Removed as per user request

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root to: proc { [200, {}, [{ message: "Vardiya API is running" }.to_json]] }
end
