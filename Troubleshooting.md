### I'm on Linux and get the error "connect EACCES /var/run/docker.sock"

Since VS Code runs as a non-root user, you will need to follow the steps in "Manage Docker as a non-root user" from [Post-installation steps for Linux](https://aka.ms/AA37yk6) for the extension to be able to access docker.

### Docker containers and images have disappeared from Docker view

This is most likely caused by a conflict with another extension called `Docker Explorer` (not authored by Microsoft). We are working with the author of that extension to have it fixed permanently. In the meantime, [use a workaround described here](https://github.com/microsoft/vscode-docker/issues/1609#issuecomment-586331394).

### The extension does not find Docker on a remote machine ("Failed to connect. Is Docker installed and running?" error)

1. Make sure Docker engine **is installed** on the remote machine and that Docker CLI works (do `docker ps` and ensure it does not return any errors).
2. If using a remote development environment (remote machine via SSH, WSL subsystem, GitHub Codespace), ensure that Docker extension is installed remotely in addition to being installed locally. 

### Invalid URL Errors
If you have a need to connect to a remote Docker daemon, we highly recommend using Docker contexts instead of a `docker.host` attribute in the settings. Check out this guide to learn how to [create and use a context](https://docs.docker.com/engine/context/working-with-contexts/) to communicate with a remote Docker daemon. 

If you still need to override the Docker context you are currently using, make sure your `DOCKER_HOST` environment variable or `docker.host` attribute includes a protocol in the URL (e.g ssh://myuser@mymachine or tcp://1.2.3.4).

> **Important Note:** Keep in mind that your `docker.host` attribute will override your Docker context and the `DOCKER_HOST` environment variable will override both the `docker.host` attribute and your Docker context.

> Tip: In Powershell you can change your docker environment variable with `$ENV:DOCKER_HOST = 'ssh://username@1.2.3.4'`

