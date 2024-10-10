# Check if both arguments are provided
if [[ -z "$1" || -z "$2" ]]; then
  printf "\e[1;31mError: Both run command and environment are required.\e[0m\n"
  printf "\e[1;31mUsage: \e[1;36m$0 <run|cloud> <development|staging|production>\e[0m\n"
  exit 1
fi

COMMAND=$1
ENVIRONMENT=$2

ENV_DIR="env.$ENVIRONMENT"

printf "\n\e[1;33m================== WELCOME TO WORKBRIGHT K6 RUNNER ==================\e[0m\n\n"
printf "\e[1;33mUsing: k6 $COMMAND\e[0m\n"
printf "\e[1;33mLoading the following environment variables from \e[1;36m$ENV_DIR\e[1;33m folder, please confirm they look right:\e[0m\n\n"
printf "\e[1;33mBASE_URL: \e[1;36m$(cat $ENV_DIR/.base_url)\e[0m\n"
printf "\e[1;33mADMIN_EMAIL: \e[1;36m$(cat $ENV_DIR/.admin_email)\e[0m\n"
printf "\e[1;33mADMIN_PASSWORD: \e[1;36m$(cat $ENV_DIR/.admin_password)\e[0m\n"
printf "\e[1;33mAPI_KEY: \e[1;36m$(cat $ENV_DIR/.api_key)\e[0m\n\n"
if [ "$COMMAND" == "run"  ]; then
  printf "\e[1;31m*************************************************************************************\e[0m\n"
  printf "\e[1;31m*                                                                                   *\e[0m\n"
  printf "\e[1;31m* WARNING: you are about to run K6 locally.                                         *\e[0m\n"
  printf "\e[1;31m* First, make sure your machine can handle the amount of VUs you have configured.   *\e[0m\n"
  printf "\e[1;31m*                                                                                   *\e[0m\n"
  printf "\e[1;31m*************************************************************************************\e[0m\n\n"
fi
printf "\e[1;33m======================================================================\e[0m\n\n"

# Prompt for confirmation
printf "\e[1;33mDo you want to proceed? \e[1;36m(y/n): \e[0m"
read -r REPLY
echo  # move to a new line

# Check if the user entered 'y' or 'Y'
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Proceeding with the script..."

  k6 $COMMAND \
    -e BASE_URL=$(cat $ENV_DIR/.base_url) \
    -e ADMIN_EMAIL=$(cat $ENV_DIR/.admin_email) \
    -e ADMIN_PASSWORD=$(cat $ENV_DIR/.admin_password) \
    -e API_KEY=$(cat $ENV_DIR/.api_key) main.js
else
  echo "Operation canceled."
  exit 1
fi
