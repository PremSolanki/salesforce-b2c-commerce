# Salesforce Commerce Cloud CLI #

accelDeply.sh is group of bash commands written over the Salesforce Commerce Cloud CLI is a command line interface (CLI) for Salesforce Commerce Cloud. It can be used to facilitate deployment and continuous integration practices using Salesforce B2C Commerce.

The CLI can be used from any machine either locally or from build tools, like Jenkins, Travis CI, Bitbucket Pipelines, Heroku CI etc.

In addition to the CLI a basic JavaScript API is included which can be used to integrate with higher level applications on Node.js.

## Prerequisites ##

### Configure an API key ###

Ensure you have a valid Commerce Cloud API key (client ID) set up. If you don't have a API key, you can create one using the [Account Manager](https://account.demandware.com). Management of API keys is done in _Account Manager > API Client_ and requires _Account Administrator_ or _API Administrator_ role.

For automation (e.g. a build server integration) you'll need the API key as well as the API secret for authentication. If you want to use authentication in interactive mode, you have to set _Redirect URIs_ to `http://localhost:8080`. If you want to manage sandboxes you have to set _Default Scopes_ to `roles tenantFilter profile`.

### SLAS Prerequisites ###
In order to use your API key with SLAS, please ensure the following are configured for your client:

1. Has `Roles` > `Commerce Cloud Developer Experience` > `Sandbox API User` with "All Sandboxes" scope.<br/>
  ![Account Manager Client ID](docs/images/client-api-user.png)
2. Set _Default Scopes_ to:
```txt
mail
roles
tenantFilter
profile
openId
```
3. Set "Token Endpoint Auth Method" to `client_secret_post`
4. Set "Access Token Format" to `JWT`
    
### Grant your API key access to your instances ###

In order to perform CLI commands, you have to permit API calls to the Commerce Cloud instance(s) you wish to integrate with. You do that by modifying the Open Commerce API Settings as well as the WebDAV Client Permissions on the Commerce Cloud instance.

1. Log into the Business Manager
2. Navigate to _Administration > Site Development > Open Commerce API Settings_
3. Make sure, that you select _Data API_ and _Global_ from the select boxes
4. Add the permission set for your client ID to the settings.

Use the following snippet as your client's permission set, replace `my_client_id` with your own client ID. Note, if you already have Open Commerce API Settings configured on your instance, e.g. for other API keys, you have to merge this permission set into the existing list of permission sets for the other clients.
```JSON
    {
      "_v": "19.5",
      "clients":
      [
        {
          "client_id": "my_client_id",
          "resources":
          [
            {
              "resource_id": "/code_versions",
              "methods": ["get"],
              "read_attributes": "(**)",
              "write_attributes": "(**)"
            },
            {
              "resource_id": "/code_versions/*",
              "methods": ["patch", "delete"],
              "read_attributes": "(**)",
              "write_attributes": "(**)"
            },
            {
              "resource_id": "/jobs/*/executions",
              "methods": ["post"],
              "read_attributes": "(**)",
              "write_attributes": "(**)"
            },
            {
              "resource_id": "/jobs/*/executions/*",
              "methods": ["get"],
              "read_attributes": "(**)",
              "write_attributes": "(**)"
            },
            { 
              "resource_id": "/sites/*/cartridges", 
              "methods": ["post"], 
              "read_attributes": "(**)", 
              "write_attributes": "(**)"
            },
            {
              "resource_id":"/role_search",
              "methods":["post"],
              "read_attributes":"(**)",
              "write_attributes":"(**)"
            },
            {
              "resource_id":"/roles/*",
              "methods":["get"],
              "read_attributes":"(**)",
              "write_attributes":"(**)"
            },
            {
              "resource_id":"/roles/*/user_search",
              "methods":["post"],
              "read_attributes":"(**)",
              "write_attributes":"(**)"
            },
            {
              "resource_id":"/roles/*/users/*",
              "methods":["put","delete"],
              "read_attributes":"(**)",
              "write_attributes":"(**)"
            },
            {
              "resource_id":"/user_search",
              "methods":["post"],
              "read_attributes":"(**)",
              "write_attributes":"(**)"
            },
            {
              "resource_id":"/users",
              "methods":["get"],
              "read_attributes":"(**)",
              "write_attributes":"(**)"
            },
            {
              "resource_id":"/users/*",
              "methods":["put","get","patch","delete"],
              "read_attributes":"(**)",
              "write_attributes":"(**)"
            }
          ]
        }
      ]
    }
```

5. Navigate to _Administration > Organization > WebDAV Client Permissions_
6. Add the permission set for your client ID to the permission settings.

Use the following snippet as your client's permission set, replace `my_client_id` with your client ID. Note, if you already have WebDAV Client Permissions configured, e.g. for other API keys, you have to merge this permission set into the existing list of permission sets for the other clients.
```JSON
    {
      "clients":
      [
        {
          "client_id": "my_client_id",
          "permissions":
          [
            {
              "path": "/impex",
              "operations": [
                "read_write"
              ]
            },
            {
              "path": "/cartridges",
              "operations": [
                "read_write"
              ]
            },
            {
              "path": "/static",
              "operations": [
                "read_write"
              ]
            },
            {
              "path": "/catalogs/<your-catalog-id>",
              "operations": [
                "read_write"
              ]
            },
            {
              "path": "/libraries/<your-library-id>",
              "operations": [
                "read_write"
              ]
            },
            {
              "path": "/dynamic/<your-site-id>",
              "operations": [
                "read_write"
              ]
            }
          ]
        }
      ]
    }
```

## Dependencies ##

If you plan to integrate with the JavaScript API or if you want to download the sources and use the CLI through Node you need Node.js and npm to be installed. No other dependencies.

Please check [this guide](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies) on how to define dependency to the right version using a GIT url.

If do not want to use the JavaScript API, but just the CLI you don't need Node.js and npm necessarily. See "Installation Instructions" for details below.

## Installation Instructions ##

You can install the CLI from `npm`, using a pre-built binary or from source using Node.js.

### Install from `npm` ###

If you already have [Node.js](https://nodejs.org/en/download/) installed, you can install globally using `npm` or run using [`npx`](https://docs.npmjs.com/cli/v7/commands/npx):

```sh
npm install -g sfcc-ci

# Or alternatively, using npx:
npx sfcc-ci
```

## Commands : Go to the root directory of the project and run below commands ##
    ./tools/accelDeploy.sh code newbuild    Create new code version Deploy the code under the catridges folder to sandbox and activate the code version.
    ./tools/accelDeploy.sh code             Deploy the code under the catridges folder to sandbox and activate the code version in the existing code version.
    ./tools/accelDeploy.sh BMCR             Deploy the BMCR under the sites folder to sandbox (merge mode).
    

In addition the CLI can be configured by placing a `dw.json` file into the current working directory. The `dw.json` may carry details used run authentication.

```json
{
    "client-id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "client-secret": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "username": "user",
    "password": "password",
    "hostname": "<dev-sandbox>.demandware.net"
}
```

***
