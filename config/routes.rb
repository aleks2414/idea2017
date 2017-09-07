Rails.application.routes.draw do

get '/proyectos_de_innovacion' => 'pages#proyectos'
get '/emprendedores' => 'pages#emprendedores'
get '/academy' => 'pages#academy'
get '/nosotros' => 'pages#idearia_lab'
get '/proyectos_de_innovacion/comerciales' => 'pages#comerciales'
get '/proyectos_de_innovacion/comerciales/experiencia_del_cliente' => 'pages#experiencia_cliente'
get '/proyectos_de_innovacion/comerciales/nuevos_clientes' => 'pages#nuevos_clientes'
get '/proyectos_de_innovacion/comerciales/nuevos_productos_o_servicios' => 'pages#nuevos_productos'
get '/proyectos_de_innovacion/comerciales/nuevas_lineas_de_negocio' => 'pages#nuevas_lineas'
get '/proyectos_de_innovacion/innovacion/laboratorio_de_innovacion' => 'pages#lab_innovacion'
get '/proyectos_de_innovacion/innovacion/cultura_de_la_innovacion' => 'pages#cultura_innovacion'
get '/transformacion_digital/diseno_web' => 'pages#diseño_web'
get '/transformacion_digital/mobile' => 'pages#mobile'
get '/transformacion_digital/devops' => 'pages#devops'
get '/gestion_del_talento/rediseno_de_area' => 'pages#rediseño_area'
get '/gestion_del_talento/reclutamiento_y_seleccion' => 'pages#reclutamiento_selección'
get '/emprendedores/diseno_de_modelo_de_negocio' => 'pages#modelo_de_negocios'
get '/nosotros/equipo' => 'pages#equipo'
get '/nosotros/casos_de_exito' => 'pages#casos_exito'
get '/nosotros/herramientas' => 'pages#herramientas'
get '/proyectos_de_innovacion/innovacion' => 'pages#innovacion'
get '/proyectos_de_innovacion/transformacion_digital' => 'pages#transformacion_digital'
get '/proyectos_de_innovacion/gestion_del_talento' => 'pages#rrhh'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
