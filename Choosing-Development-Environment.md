# Development environment choices

Developing a container-based service can be done using **local environment** or **remote environment**. The local environment is the operating system of your developer workstation; a remote environment can be a remote machine accessible via SSH, a virtual machine running on your developer workstation, or a **development container**.

A remote development environment for containers [can have advantages over local environment](https://code.visualstudio.com/docs/remote/remote-overview), the main one being **the ability to use the same operating system for development and for the container**. 

To use a remote development environment, one needs to ensure that `docker` command (Docker CLI) [is available and functional within the environment](#enabling-docker-cli-inside-a-development-environment).

The second important choice is whether to debug a service running as a process within the development environment, or **debug the service running as a container**.

# Rules of thumb for choosing a development environment
1. Use **local environment** when you are not particularly concerned about:
   - using the same OS for development and inside the service container, nor 
   - installing necessary tools and dependencies on top of your local environment.

1. Consider [development container](https://code.visualstudio.com/docs/remote/containers) first if you need a remote environment.
    - On Windows, [Windows Subsystem for Linux (WSL)](#windows-subsystem-for-linux) is worth considering as an alternative.

1. Debugging a service running in a container is possible, but brings additional complexity. Use normal debugging by default, and debugging in container when you need it. 

> The Docker extension natively supports container debugging for .NET- and Node.js-based services only.

# Enabling Docker CLI inside a development environment

## Development container
The recommended setup is to **redirect the Docker CLI inside the development container to the Docker daemon running on the local machine**.

First, make sure Docker CLI is installed into your development container. Exact steps [depend on Linux distribution the container is using](https://docs.docker.com/install/); here is an example for Ubuntu-based distros (from `.devcontainer/Dockerfile`):

```
    ...
    && apt-get -y install software-properties-common \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - 2>/dev/null \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable" \
    && apt-get update -y \
    && apt-get install -y docker-ce-cli \
    && apt-get install -y python python-pip \
    && pip install docker-compose \
    ...
```

Next, ensure that Docker socket is mapped into the development container (`.devcontainer/devcontainer.json`):

```json
    ...
    "runArgs": [ "-v", "/var/run/docker.sock:/var/run/docker.sock"]
    ...
```

## Windows Subsystem for Linux

Windows Subsystem for Linux represents a great choice for container-based service development on Windows. We strongly recommend the new [Windows Subsystem for Linux version 2 (WSL 2)](https://docs.microsoft.com/windows/wsl/wsl2-index). Docker Desktop for Windows has been updated to work with WSL 2 and it has a graphical setting to enable Docker CLI inside WSL 2 distribution(s):

[[images/devenv-enable-docker-wsl2.png|alt=Enable Docker inside WSL 2 distribution]]

> As of November 2019, WSL 2 is part of Windows Insider builds. To try out the new Docker engine you will need  Windows Insider build 19018 or newer, and the [Docker Desktop for Windows Edge release 2.1.6.1 or newer](https://docs.docker.com/docker-for-windows/edge-release-notes/)
>
> The old version of WSL (WSL 1) does not provide an easy way to connect to the Docker daemon on the host.

## Remote machine or virtual machine

#### Docker in Docker
The simplest way to enable container development with a remote machine is to do [a full Docker installation](https://docs.docker.com/install/) on the machine, including Docker daemon. For a local VM the virtualization software needs to have **nested virtualization** option enabled; it is supported by all mainstream virtualization technologies such as Hyper-V, Parallels or Oracle VirtualBox.

#### Reusing the host Docker daemon
Alternatively, one can install just the Docker CLI inside development environment and point the CLI to the Docker host (daemon) running on the developer workstation using [Docker context mechanism](https://docs.docker.com/engine/context/working-with-contexts/). The main concern with this approach is ensuring network connectivity from the VM to the Docker daemon on the host, **and doing so in a secure way**. One option is to use [[SSH tunelling|SSH]] to developer workstation. Another option is to [make Docker daemon listen on HTTPS port](https://docs.docker.com/engine/security/https/). Both options are considered advanced and outside the scope of this document.


# Debugging in a container

The Docker extension supports debugging .NET Core&ndash;based and Node.js&ndash;based services running inside a container. Other programming languages are not supported at this time.

Debugging in a container may be somewhat harder to set up than regular debugging because a container is a stronger isolation mechanism than a process. In particular:

- The debug engine running inside VS Code process needs to communicate with the service process being debugged. In case of a service running inside a container this implies network communication via a common network (typically Docker host network). The container **needs to have appropriate ports exposed via the Docker host network** for the debug engine to connect to the service process (Node.js), or debugger proxy running inside the container (.NET Core).
- Source file information generated during build time is valid in the context of the build environment (where VS Code is running). The container filesystem is different from the build environment filesystem, and **paths to source files need to be re-mapped** in order for the debugger to display correct source file when a breakpoint is hit.

Because of the concerns above, it is generally recommended to use regular debugging, and employ debugging in a container when necessary.

For more information about how to set up debugging inside a container see [[ASP.NET Core quickstart|ASP-NET-Core]], [[Node.js quickstart|Node-JS]], and [[Docker extension task properties|Extension-Properties-And-Tasks]] (`docker-build` and `docker-run` tasks).
