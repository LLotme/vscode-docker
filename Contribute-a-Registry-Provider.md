## Connect a Generic Docker Registry

First, try connecting your registry as a "Generic Docker Registry". Many registries will work with our existing implementation of the [Docker V2 API](https://docs.docker.com/registry/spec/api/) and do not require any additional contributions.

This feature has the following limitations:
1. It currently only supports basic authentication, or token endpoints that accept basic authentication.
1. You must connect a _private_ registry. It won't work for _central_ registries like Docker Hub or GitLab that host repositories for many users under unique namespaces.

## Contribute a Registry Provider

If the "Generic Docker Registry" support is not sufficient, follow these steps to contribute a new provider:

1. **Determine registry API**: Most registries support the [Docker Registry V2 API](https://docs.docker.com/registry/spec/api/). In general, any registry provider contribution using a custom API will be scrutinized more closely; it is strongly preferred that all registries support the V2 API.
1. **Determine registry authentication**: Most registry providers have their own authentication mechanism. For example, some require credential helpers, some require OAuth client application registration, etc.
1. **Get Started**: Follow the steps in the [contributing section](https://github.com/microsoft/vscode-docker#contributing) to clone and start working in our repo.
1. **Implement**: Add at least the following code:
    1. For Registry V2 clients:
        1. Add a provider registration in `src/tree/registries/dockerV2`, similar to `src/tree/registries/dockerV2/genericDockerV2RegistryProvider.ts`, and add it to the list in `src/tree/registries/all/getRegistryProviders.ts`.
        1. If needed, add an authentication provider implementing `IAuthProvider` in `src/tree/registries/auth`.
    1. For non-Registry V2 clients:
        1. Add an entry for your api in `src/tree/registries/all/RegistryApi.ts`
        1. Add a new folder in `src/tree/registries` for your provider
        1. Create an `IRegistryProvider` in your new folder, implementing all required fields, and add it to the list in `src/tree/registries/all/getRegistryProviders.ts`
1. **Submit a PR!**