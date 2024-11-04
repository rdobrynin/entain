app_shell:
	@docker exec -it roman-app bash

db:
	@docker exec roman-app php artisan migrate

run:
	@composer install && docker compose up -d && echo 'Wait pls 5 seconds' && sleep 5s && docker exec roman-app php artisan migrate

down:
	@docker compose down --remove-orphans
