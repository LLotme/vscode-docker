> Note: For the 0.9.0 release, we are working on expanding and refining our wiki documentation. If you have questions that are not answered here, please [file an issue](https://github.com/microsoft/vscode-docker/issues/new) so we know what is missing.

The Docker extension makes it easy to build, manage and deploy containerized applications from Visual Studio Code. 

This page provides an overview of the Docker extension capabilities; use the side menu to learn more about topics of interest. If you are just getting started with Docker development, read about [Docker application development](https://docs.docker.com/develop/) first to understand key Docker concepts.


## Installation

[Install Docker](https://docs.docker.com/install/) on your machine and add it to the system path.

On Linux, you should also [enable Docker CLI for the non-root user account](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) that will be used to run VS Code.

To install the extension, open Extensions view (`Ctrl+Shift+X`), search for `docker` to filter results and select Docker extension authored by Microsoft.

[[images/home-installation-extension-search.png|alt=Select Docker extension]]

## Editing Docker files

You can get IntelliSense when editing your `Dockerfile` and `docker-compose.yml` files, with completions and syntax help for common commands.

[[images/home-dockerfile-intellisense.png|alt=IntelliSense for Dockerfiles]]

In addition, you can use the Problems panel to view common errors for `Dockerfile` and `docker-compose.yml` files.

## Generating Docker files

You can add Docker files to your workspace by opening the Command Palette (`F1` key) and using `Docker: Add Docker Files to Workspace` command. The command will generate `Dockerfile` and `.dockerignore` files and add them to your workspace. The command will also query you if you want the Docker Compose files added as well; this is optional.

The extension recognizes workspaces that use most popular development languages (C#, Node.js, Python, Ruby, Go and Java) and customizes generated Docker files accordingly.

## Docker view

The Docker extension contributes a Docker view to VS Code. The Docker view lets you examine and manage Docker assets: containers, images, volumes, networks, and container registries. If the Azure Account extension is installed, you can browse your Azure Container Registries as well.

The right-click menu provides access to commonly-used commands for each type of asset.

[[images/home-docker-view-context-menu.gif|alt=Docker view context menu]]

You can rearrange the Docker view panes by dragging them up or down with a mouse and use the context menu to hide or show them.

[[images/home-docker-view-rearrange.gif|alt=Customize Docker view]]

## Docker commands

Many of the most common Docker commands are built right into the Command Palette:

[[images/home-command-palette.png|alt=Docker commands]]

You can run Docker commands to manage [images](https://docs.docker.com/engine/reference/commandline/image/), [networks](https://docs.docker.com/engine/reference/commandline/network/), [volumes](https://docs.docker.com/engine/reference/commandline/volume/), [image registries](https://docs.docker.com/engine/reference/commandline/push/) and [Docker Compose](https://docs.docker.com/compose/reference/overview/). In addition, the `Docker: Prune System` command will remove stopped containers, dangling images, and unused networks and volumes.

## Using image registries

You can display the content and push/pull/delete images from [Docker Hub](https://hub.docker.com/) and [Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/):

[[images/home-container-registry.png|alt=Azure Container Registry content]]

An image in an Azure Container Registry can be deployed to Azure App Service directly from VS Code&mdash;see [[Deploy images to Azure App Service|App-Service]] page. For more information about how to authenticate to and work with registries see [[Work with container registries|Quickstart-Container-Registries]] page. 

## Debugging services running inside a container

You can debug services build using .NET (C#) and Node.js that are running inside a container. The extension offers custom tasks that help with launching a service under the debugger and with attaching the debugger to a running service instance. For more information see [[Debug container application|Quickstart-Debugging]]  and [[Extension Properties and Tasks|Extension-Properties-And-Tasks]] pages.

## Azure CLI integration

You can start Azure CLI (command-line interface) in a standalone, Linux-based container with `Docker Images: Run Azure CLI` command. This allows access to full Azure CLI command set in an isolated environment. See [Get started with Azure CLI](https://docs.microsoft.com/cli/azure/get-started-with-azure-cli?view=azure-cli-latest#sign-in) page for more information on available commands.