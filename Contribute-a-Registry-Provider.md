## Connect a Generic Docker Registry

First, try connecting your registry as a "Generic Docker Registry". Many registries will work with our existing implementation of the [Docker V2 API](https://docs.docker.com/registry/spec/api/) and do not require any additional contributions.

This feature has the following limitations:
1. You must connect a single registry at a time
1. It currently only supports basic authentication. Token authentication has not been implemented yet, but is tracked in [#869](https://github.com/microsoft/vscode-docker/issues/869) and documented [here](https://docs.docker.com/registry/spec/auth/). Contributions are welcome!
1. You must connect a _private_ registry. It won't work for _central_ registries like Docker Hub or GitLab that host repositories for many users under unique namespaces.

## Contribute a Registry Provider

If the "Generic Docker Registry" support is not sufficient, follow these steps to contribute a new provider:

1. **Determine registry API**: For example, GitLab exposes a [public API](https://docs.gitlab.com/ee/api/container_registry.html) other than the default [Docker API](https://docs.docker.com/registry/spec/auth/). This api will be used to list repositories and tags.
1. **Determine registry Authentication**: For example, GitLab details authenticating requests [using OAuth](https://docs.gitlab.com/ee/api/oauth2.html).
1. **Get Started**: Follow the steps in the [contributing section](https://github.com/microsoft/vscode-docker#contributing) to clone and start working in our repo.
1. **Implement**: Add at least the following code:
    1. Add an entry for your api in `src/tree/registries/all/RegistryApi.ts` (unless your provider leverages an existing API)
    1. Add a new folder in `src/tree/registries` for your provider
    1. Create an `IRegistryProvider` in your new folder, implementing all required fields, and add it to the list in `src/tree/registries/all/getRegistryProviders.ts`
1. **Submit a PR!**