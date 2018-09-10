# HMDA Help

__This project is a work in progress.__

### Project description coming soon.

_This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find the most recent information on how to perform common tasks in [this guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)._

### Get up and running ... for now

#### Back-end

To be able to use the back-end API:

- Open a terminal window and create a Cassandra database with
  `docker run -it  -p 9042:9042 cassandra`
- Open a different terminal window and run
  `docker run -p 8080:8080 -p 8081:8081 -p 8082:8082 -p 9080:9080 -p 8558:8558 -e HMDA_RUNTIME_MODE=dev-node -e CASSANDRA_CLUSTER_HOSTS=192.168.99.100 hmda/hmda-platform:2.5.3`

Once that is complete that back-end API should be available.

#### Front-end (this repo)

After closing the repo:

- run `yarn`
- run `yarn start` to begin using the UI in development mode (see [create react apps instructions](https://github.com/facebook/create-react-app) for more information)