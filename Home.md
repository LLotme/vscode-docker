The Docker extension makes it easy to build, manage and deploy containerized applications from Visual Studio Code. 

This page provides an overview of the Docker extension capabilities; use the side menu to learn more about topics of interest.


## Installation

[Install Docker](https://docs.docker.com/install/) on your machine and add it to the system path.

On Linux, you should also [enable Docker CLI for the non-root user account](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) that will be used to run VS Code.

To install the extension, open Extensions view (`Ctrl+Shift+X`), search for `docker` to filter results and select Docker extension authored by Microsoft.

[[images/home-installation-extension-search.png|alt=Select Docker extension]]

## Editing Docker files

Rich IntelliSense (completions) are provided for `Dockerfile` and `docker-compose.yml` files:

[[images/home-dockerfile-intellisense.png|alt=IntelliSense for Dockerfiles]]

In addition, common errors for `Dockerfile` and `docker-compose.yml` files are detected and reported in the Problems panel.

## Generating Docker files

`Docker: Add Docker Files to Workspace` command will generate `Dockerfile`, `docker-compose.yml`, `docker-compose.debug.yml` and `.dockerignore` files to your workspace. The extension recognizes workspaces that use most popular development languages (C#, Node.js, Python, Ruby, Go and Java) and customizes Docker files accordingly.

## Docker view

The Docker extension contributes a Docker view to VS Code. The Docker view lets you examine and manage Docker assets: containers, images, volumes, networks, and container registries. If the Azure Account extension is installed, you can browse your Azure Container Registries as well.

The right-click menu provides access to commonly-used commands for each type of asset.

[[images/home-docker-view-context-menu.gif|alt=Docker view context menu]]

You can rearrange the Docker view panes by dragging them up or down with a mouse and use the context menu to hide or show them.

[[images/home-docker-view-rearrange.gif|alt=Customize Docker view]]

## Docker commands

Many of the most common Docker commands are built right into the Command Palette:

[[images/home-command-palette.png|alt=Docker commands]]

Covered areas include images, networks, volumes, container registries and Docker Compose. In addition, the `Docker: Prune System` custom command will remove stopped containers, dangling images, and unused networks and volumes.

## Using container registries

You can display the content and push/pull/delete images from Docker Hub and Azure Container Registries:

[[images/home-container-registry.png|alt=Azure Container Registry content]]

An image in an Azure Container Registry can be deployed to Azure App Service directly from VS Code&mdash;see [[Deploy images to Azure App Service|App-Service]] page. For more information about how to authenticate to and work with registries see [[Work with container registries|Quickstart-Container-Registries]] page. 

## Debugging services running inside a container

Services build using .NET (C#) and Node.js can be debugged when running inside a container. The extension offers custom tasks that help with launching a service under the debugger and with attaching the debugger to a running service instance. For more information see [[Debug container application|Quickstart-Debugging]]  and [[Customize container build and execution with tasks|Tasks]] pages.

## Azure CLI integration

The extension adds `Docker Images: Run Azure CLI` command that launches Azure CLI inside a standalone, Linux-based Docker container. This allows access to full Azure CLI command set in an isolated environment. See [Get started with Azure CLI](https://docs.microsoft.com/cli/azure/get-started-with-azure-cli?view=azure-cli-latest#sign-in) page for more information on available commands.