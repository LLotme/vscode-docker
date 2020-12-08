### I'm on Linux and get the error "connect EACCES /var/run/docker.sock"

Since VS Code runs as a non-root user, you will need to follow the steps in "Manage Docker as a non-root user" from [Post-installation steps for Linux](https://aka.ms/AA37yk6) for the extension to be able to access docker.

### Docker containers and images have disappeared from Docker view

This is most likely caused by a conflict with another extension called `Docker Explorer` (not authored by Microsoft). We are working with the author of that extension to have it fixed permanently. In the meantime, [use a workaround described here](https://github.com/microsoft/vscode-docker/issues/1609#issuecomment-586331394).

### The extension does not find Docker on a remote machine ("Failed to connect. Is Docker installed and running?" error)

1. Make sure Docker engine **is installed** on the remote machine and that Docker CLI works (do `docker ps` and ensure it does not return any errors).
2. Verify that Docker extension is installed on the remote machine. As of February 2020 [there is a bug in VS Code](https://github.com/microsoft/vscode/issues/83675) that prevents the Docker extension to be installed remotely if it is already installed locally. This bug is scheduled to be fixed in VS Code 1.43 release. A workaround to get the extension installed remotely [is described here](https://github.com/microsoft/vscode-docker/issues/1582#issuecomment-578882428).

### Invalid URL Errors

When using our tools, your Docker Host URL needs to use a complete URL to work with our Extension. Depending on your server's protocol, you need to prepend your protocol explicity with ssh, tcp, or other (e.g ssh://myuser@12.3.4 or tcp://1.2.3.4). This issue is common because generally the Docker CLI accepts a `DOCKER_HOST` environment variable URL without needing a prepended protocol. From VS Code, you may either set your Docker Host URL with the `docker.host` attribute in `settings.json` or by setting the `DOCKER_HOST` environment variable from the command line. These errors mainly affect Node users.

To change your `docker.host` attribute: 
1. Type `Ctrl` and `,` or select File > Preferences > Settings
1. Search for "docker.host"
1. Enter your Docker Host URL with a prepended protocol

If you do not want to change your `docker.host` attribute within `settings.json` of VS Code, **which overrides the DOCKER_HOST environment variable on your PC**, you can change the environment variable from the command line (OS specific). 

For example, ***In Powershell you can change your docker environment variable with `$ENV:DOCKER_HOST = 'ssh://username@1.2.3.4'`***

We recommend removing the docker.host attribute altogether and creating a context to connect to. However, before creating a context, **make sure to delete or clear your DOCKER_HOST environment variable from your PC**.

Check out this guide to learn more about (working with contexts)[https://docs.docker.com/engine/context/working-with-contexts/] to communicate with your docker daemon. 
