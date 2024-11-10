# Krom Take Home Test FE

### UI and Flow Example

#### Applications List Page

![aplications list](./docs/application%20list.gif)

#### Create new Application Page

![create](./docs/create.gif)

### Setup

#### Without Docker

1. Install dependencies

```
npm install
```

2. Change name of .env.example to .env and change the REACT_APP_API_URL to `http://localhost:3000`

3. Start app

```
npm start
```

#### With docker

1. Build the docker image

```
docker build -t my-react-app .
```

2. Run docker nginx container for react app

```
docker run -d -p 80:80 my-react-app
```

3. React app will be served in `localhost:80`
