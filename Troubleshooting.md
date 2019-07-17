## I get "unauthorized: authentication required" in the terminal when executing some commands, such as "Docker: push".

Make sure you are signed in to the Docker Hub or Azure container registry from the docker CLI via `docker login` (using your username, not your e-mail address).

If you are using an Azure container registry, you will need to get the username and password from Azure by right-clicking on the Azure container registry in the extension and selecting "Browse in the Azure Portal", then selecting the "Access Keys" tab.
![AzureUsernamePassword](https://user-images.githubusercontent.com/11282622/61395920-64607e80-a87b-11e9-9da6-de6dd7d0aca9.png)

Finally, execute `docker login`, for example:

```bash
docker login exampleazurecontainerregistry.azurecr.io
```

and respond with the username and password specified by Azure.

## I'm on Linux and get the error "Unable to connect to Docker, is the Docker daemon running?"

Since VS Code runs as a non-root user, you will need to follow the steps in “Manage Docker as a non-root user” from [Post-installation steps for Linux](https://aka.ms/AA37yk6) for the extension to be able to access docker.
