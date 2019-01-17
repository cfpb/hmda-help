# HMDA Help

The HMDA Help application allows for management (create, update, delete) of HMDA institutions.

_This project was bootstrapped with [Create React App (CRA)](https://facebook.github.io/create-react-app/)._

## Installation

We use node and yarn to manage front-end dependencies. You should have both [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/lang/en/docs/install/) installed.

```shell
$ git clone git@github.com:cfpb/hmda-help.git
$ cd hmda-help
$ yarn
```

### Building and viewing

Due to the back-end API and authentication requirements there are 2 files changes required before building the UI:

1. Update [`package.json`](package.json) to add a `proxy`. This should be set to the development environment. For example:

```json
{
  "homepage": "/hmda-help",
  "proxy": "https://[devenv].cfpb.gov"
}
```

This will proxy all API requests to the `[devenv].cfpb.gov` environment. See the [CRA "Proxying API Requests in Development" documentation](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development) for more details.

2. Update the [`"auth-server-url": "/auth"`](https://github.com/cfpb/hmda-help/blob/2a36dd2ce3e65d2e5fd42e3c849566aa30359596/public/keycloak.json#L3) property of the [`keycloak.json`](public/keycloak.json) file to use the `[devenv].cfpb.gov` environment.

For example:

```json
{
  "realm": "hmda2",
  "auth-server-url": "https://[devenv].cfpb.gov/auth",
  "ssl-required": "all",
  "resource": "hmda2-api",
  "public-client": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0
}
```

This will allow authentication using Keycloak.

Now you can run `yarn start` to begin using the UI in development mode. See the [available scripts](https://facebook.github.io/create-react-app/docs/available-scripts) in the CRA documentation for more details.

## Getting involved

[CONTRIBUTING](CONTRIBUTING.md)

## Open source licensing info

1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
