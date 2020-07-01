## Connect a Generic Docker Registry

First, try connecting your registry as a "Generic Docker Registry". Many registries will work with our existing implementation of the [Docker V2 API](https://docs.docker.com/registry/spec/api/) and do not require any additional contributions.

This feature has the following limitations:
1. It currently only supports basic authentication, or token endpoints that accept basic authentication.
1. You must connect a _private_ registry. It won't work for _central_ registries like Docker Hub or GitLab that host repositories for many users under unique namespaces.

## Contribute a Registry Provider

We have a proposal for a better registry extensibility model [here](https://github.com/microsoft/vscode-docker/issues/2033). We'd love to hear your feedback on it!