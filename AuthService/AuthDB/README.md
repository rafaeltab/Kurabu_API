# AuthDB

## Migrations

Code first migrations

Use a route e.g. `api/migrations` which requires `migrations:list` permissions.
Here a list of all the applied and available migrations can be seen.
In another endpoint e.g. `api/migrations/migrate` you can manually migrate.

### Endpoints

GET `api/migrations`, `migrations:list`, list database and local migrations
