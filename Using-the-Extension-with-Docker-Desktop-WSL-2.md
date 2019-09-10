## Prerequisites

* Install **Windows 10 Insider Preview build 18975** or later
* Enable WSL 2 by following [this guide](https://aka.ms/wsl2-install)
* Install the **Ubuntu 18.04** distribution from the [Microsoft Store](https://www.microsoft.com/en-us/p/ubuntu-1804-lts/9n9tngvndl3q)

## Setup WSL 2

Open PowerShell with administrator privileges and ensure **Ubuntu-18.04** is installed correctly by running `$ wsl -l` then enable WSL 2 features by running `$ wsl --set-version Ubuntu-18.04 2`.

> You can set WSL 2 as your default architecture by running `$ wsl --set-default-version 2`

## Install Docker Desktop WSL 2

Install the Docker Desktop WSL 2 technical preview using [this guide](https://docs.docker.com/docker-for-windows/wsl-tech-preview/) then start the Docker engine in WSL.

Open **Ubuntu-18.04** and run `$ docker --version` to verify that Docker is correctly installed and accessible in WSL 2.

## Configure the extension

Next, force the Docker extension to run in the workspace by adding the following to your settings.

```json
"remote.extensionKind": {
    "ms-azuretools.vscode-docker": "workspace"
}
```

If you already have the Docker extension installed open a remote WSL session then click the extension view, select the Docker extension, and click "Install on WSL: Ubuntu-18.04" to install the extension in the workspace.

![image](https://user-images.githubusercontent.com/1186948/62485726-5dd67000-b772-11e9-831c-7884316be538.png)

Reload the workspace and the Docker extension will be all set to use the Docker engine in WSL 2. 🎉