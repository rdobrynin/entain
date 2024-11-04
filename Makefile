app_shell:
	@docker exec -it roman-app bash

db:
	@docker exec roman-app php artisan migrate

run:
	@docker compose up -d && echo 'Wait pls 10 seconds' && sleep 10s && docker exec roman-app php artisan migrate

down:
	@docker compose down --remove-orphans
