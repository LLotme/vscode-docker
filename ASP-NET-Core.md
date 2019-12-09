In this guide you will learn how to:
- Create a `Dockerfile`  file describing a simple .NET Core service container.
- Build, run and verify the functionality of the service.
- Debug the service running as a container.

## Prerequisites

- Docker and the VS Code Docker extension must be installed as described on the [[Home page|Home#installation]].
- For .NET development install [.NET Core SDK](https://dotnet.microsoft.com/download). 
- [C# VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp).

## Create a .NET Core Web API project

1. Create a folder for the project.
1. Open developer command prompt in the project folder and initialize the project:
   ```bash
   dotnet new webapi --no-https
   ```

## Add Docker files to the project

1. Open the project folder in VS Code
1. Open Command Palette (`F1`) and use `Docker: Add Docker Files to Workspace...` command:

   [[images/quickstart-aspnetcore-add-dotnet.png|alt=Add Dockerfile to a .NET project]]

1. Use `ASP.NET Core` when prompted for application platform.
1. Choose `Windows` or `Linux` when prompted to choose the operating system.
    > `Windows` is only applicable if your Docker installation is configured to use Windows containers.
1. Change the port for application endpoint to `5000`.
1. `Dockerfile` and `.dockerignore` files are added to the workspace. 

   The extension will also create a set of **VS Code tasks** for building and running the container (in both debug- and release configuration, four tasks in total), and a **debugging configuration** for launching the container in debug mode.

## Build the application

1. Open terminal prompt (<code>Ctrl-`</code>).
1. Issue `dotnet build` command to build the application:
   ```
   ~/code/scratch/netcorerest$ dotnet build
   Microsoft (R) Build Engine version 16.3.0+0f4c62fea for .NET Core
   Copyright (C) Microsoft Corporation. All rights reserved.

   Restore completed in 18.97 ms for ~/code/scratch/netcorerest/netcorerest.csproj.
   netcorerest -> ~/code/scratch/netcorerest/bin/Debug/netcoreapp3.0/netcorerest.dll

    Build succeeded.
        0 Warning(s)
        0 Error(s)
   ```

## Add an environment variable to the image
You can use the Docker extension to author Docker files. The extension provides completions and contextual help. To see these capabilities add an environment variable to your service image by following these:

1. Open the `Dockerfile` file.
1. Use `ENV` instruction to add an environment variable to the service container image. The instruction should be placed in the `base` stage of the `Dockerfile` (the first stage in the file). Set the `ASPNETCORE_URLS` variable to `http://*:5000`:

   [[images/quickstart-aspnetcore-intellisense-env.png|alt=Add an environment variable to Docker image]]

   Note how the Docker extension lists all available Dockerfile instructions and describes the syntax.

   > The Docker extension uses the `base` stage of the `Dockerfile` to create a debug version of the container image for your service. Put the `ASPNETCORE_URLS` environment variable definition in the `base` stage to have this variable available in both debug and release versions of the container image.   
1. Save the `Dockerfile` file.


## Build the image

1. Open command palette (`F1`) and issue `Docker Images: Build Image...` command.
1. Open Docker view and verify that the new image is visible in the Images tree:

   [[images/quickstart-aspnetcore-verify-image.png|alt=Verify Docker image existence]]
 
## Test the service container

1. Right-click on the image built in previous step and choose `Run` or `Run Interactive`. The container should start and you should be able to see it in the "Containers" pane of the Docker view:

   [[images/quickstart-aspnetcore-running-container.png|alt=Running service container]]

1. Open the web browser and navigate to [http://localhost:5000/WeatherForecast](http://localhost:5000/WeatherForecast). You should see weather data in JSON format, similar to following:

   ```jsonc
   [
       {"date":"2019-11-07T23:31:57.0527092+00:00","temperatureC":4,"temperatureF":39,"summary":"Bracing"},
       {"date":"2019-11-08T23:31:57.0539243+00:00","temperatureC":-19,"temperatureF":-2,"summary":"Freezing"},
       {"date":"2019-11-09T23:31:57.0539269+00:00","temperatureC":2,"temperatureF":35,"summary":"Freezing"},
       {"date":"2019-11-10T23:31:57.0539275+00:00","temperatureC":-4,"temperatureF":25,"summary":"Freezing"},
       {"date":"2019-11-11T23:31:57.053928+00:00","temperatureC":9,"temperatureF":48,"summary":"Bracing"}
    ]
   ```

1. When done testing, right-click the container in the Docker view and choose `Stop`.

## Debug in container

When Docker files were added to the application, the Docker extension also added a **VS Code debugger configuration** for debugging the service when it is running inside a container. The extension will automatically detect the protocol and port that the service is using and point the browser to the service, but we need to tell it what URL path to use.

1. Set a breakpoint at the beginning of the code for the `Get()` method of the `Controllers/WeatherForecastController.cs` file.
1. Open `.vscode/launch.json` file and find `Docker .NET Core Launch` debug configuration.
1. Add `dockerServerReadyAction` to `Docker .NET Core Launch` configuration:

    ```json
    "dockerServerReadyAction": {
        "uriFormat": "%s://localhost:%s/WeatherForecast"
    }
    ```

1. Make sure the configuration is selected as active:

    [[images/quickstart-aspnetcore-debug-configuration.png|alt=Selected Docker debug configuration]]


1. Start debugging (`F5` key). 
    - The debug version of the service container builds and starts.
    - The browser opens to request a new weather forecast.
    - The breakpoint in the `WeatherForecastController` is hit.

> By default Docker will assign a randomly-chosen **host port** to a port exposed by a container (the **container port**). In this case the exposed (container) port is 5000, but it will be exposed on the host via a random port, such as 32737. 
>
> You can use specific port on the host by changing the Docker run options used by `docker-run: debug` task (defined in `.vscode/tasks.json` file). For example, if you want to use the same port (5000) to expose the service, the `docker-run: debug` task definition would look like this:
> ```json
> {
>    "type": "docker-run",
>    "label": "docker-run: debug",
>    "dependsOn": [
>        "docker-build: debug"
>    ],
>    "dockerRun": {
>        "ports": [
>            { "hostPort": 5000, "containerPort": 5000 }
>        ]
>    },
>    "netCore": {
>        "appProject": "${workspaceFolder}/netcorerest.csproj",
>        "enableDebugging": true
>    }
>
> ```

## Next steps

(learn more about debugging for .NET?) <br/>
(learn more about Dockerfile?) <br/>
(multi-service development with Docker Compose?)