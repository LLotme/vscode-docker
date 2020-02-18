### I'm on Linux and get the error "connect EACCES /var/run/docker.sock"

Since VS Code runs as a non-root user, you will need to follow the steps in "Manage Docker as a non-root user" from [Post-installation steps for Linux](https://aka.ms/AA37yk6) for the extension to be able to access docker.

### Docker containers and images have disappeared from Docker view

This is most likely caused by a conflict with another extension called `Docker Explorer` (not authored by Microsoft). We are working with the author of that extension to have it fixed permanently. In the meantime, [use a workaround described here](https://github.com/microsoft/vscode-docker/issues/1609#issuecomment-586331394).

### The extension does not find Docker on a remote machine ("Failed to connect. Is Docker installed and running?" error)

1. Make sure Docker engine **is installed** on the remote machine and that Docker CLI works (do `docker ps` and ensure it does not return any errors).
2. Verify that Docker extension is installed on the remote machine. As of February 2020 [there is a bug in VS Code](https://github.com/microsoft/vscode/issues/83675) that prevents the Docker extension to be installed remotely if it is already installed locally. This bug is scheduled to be fixed in VS Code 1.43 release. A workaround to get the extension installed remotely [is described here](https://github.com/microsoft/vscode-docker/issues/1582#issuecomment-578882428).