k6 run \
    -e BASE_URL=$(cat env/.base_url) \
    -e ADMIN_EMAIL=$(cat env/.admin_email) \
    -e ADMIN_PASSWORD=$(cat env/.admin_password) \
    -e API_KEY=$(cat env/.api_key) \
    -e K6_ENV=$(cat env/.environment) main.js