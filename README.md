# DoMyChores
There are many services out there which allow users to order rideshare (Uber), food (SkipTheDishes), grocery (InstaCart), and freelance labour (TaskRabbit) right at their fingertips. However, there is a huge potential for a service which allows users to order labour workers to perform their routine tasks (chores). The objective of this project is to design and develop a novel application which can allow users to purchase independent workers for their house chores. The expected outcome of this project is a fully fledged web application which will allow users to interact with our proposed system. 

## Usage
```sh
# Clone Repo
git clone <url> && cd DoMyChores

# Backend
cd serverless
npm i && npm i serverless -g
serverless config credentials --provider aws --key 1234 --secret 5678
serverless deploy

# Frontend
cd client
echo API_ENDPOINT_URL=https://xxxxxxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev > .env
npm install && npm start
```