run:
	@composer install && docker compose up -d && echo 'Wait pls 5 seconds' && sleep 5s && docker exec roman-app php artisan migrate:fresh --seed && cd frontend && yarn && yarn dev

down:
	@docker compose down --remove-orphans

app_shell:
	@docker exec -it roman-app bash

db:
	@docker exec roman-app php artisan migrate:fresh --seed

db_seed:
	@docker exec roman-app php artisan db:seed

db_revert:
	@docker exec roman-app php artisan migrate:rollback --step=1

db_status:
	@docker exec roman-app php artisan migrate:status

test:
	@docker exec roman-app php artisan test
