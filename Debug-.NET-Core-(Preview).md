> Note that Windows containers are **not** currently supported, only Linux containers. However, both standard and Alpine .NET Core runtime base images are supported.

### Prerequisites

1. (All users) Install the [.NET Core SDK](https://www.microsoft.com/net/download) which includes support for attaching to the .NET Core debugger.

1. (All users) Install the [C# VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) which includes support for attaching to the .NET Core debugger in VS Code.

1. (Mac users) add `/usr/local/share/dotnet/sdk/NuGetFallbackFolder` as a shared folder in your Docker preferences.

![Docker Shared Folders](https://raw.githubusercontent.com/microsoft/vscode-docker/master/images/dockerSharedFolders.png)

### Starting the Debugger

To debug a .NET Core application running in a Linux Docker container, add a Docker .NET Core launch configuration:

1. Switch to the debugging tab.
1. Select `Add configuration...`
1. Select `Docker: Launch .NET Core (Preview)`
1. Set a breakpoint.
1. Start debugging.

Upon debugging, a Docker image will be built and a container will be run based on that image.  The container will have volumes mapped to the locally-built application and the .NET Core debugger.  If the Docker container exposes port 80, after the debugger is attached the browser will be launched and navigate to the application's initial page.

> NOTE: you may see errors in the debug console when debugging ends (e.g. "`Error from pipe program 'docker': ...`"). This appears due to debugger issue [#2439](https://github.com/OmniSharp/omnisharp-vscode/issues/2439) and should not impact debugging.

Most properties of the configuration are optional and will be inferred from the project. If not, or if there are additional customizations to be made to the Docker image build or container run process, those can be added under the `dockerBuild` and `dockerRun` properties of the configuration, respectively.

```json
{
    "configurations": [
        {
            "name": "Docker: Launch .NET Core (Preview)",
            "type": "docker-coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "dockerBuild": {
                // Image customizations
            },
            "dockerRun": {
                // Container customizations
            }
        }
    ]
}
```

### Application Customizations

When possible, the location and output of the application will be inferred from the workspace folder opened in VS Code. When they cannot be inferred, these properties can be used to make them explicit:

| Property | Description | Default |
| --- | --- | --- |
| `appFolder` | The root folder of the application | The workspace folder |
| `appProject` | The path to the project file | The first `.csproj` or `.fsproj` found in the application folder |
| `appOutput` | The application folder relative path to the output assembly | The `TargetPath` MS Build property |

> You can specify either `appFolder` or `appProject` but should not specify *both*.

### Docker Build Customizations

Customize the Docker image build process by adding properties under the `dockerBuild` configuration property.

| Property | Description | Default |
| --- | --- | --- |
| `args` | Build arguments applied to the image. | None |
| `context` | The Docker context used during the build process. | The workspace folder, if the same as the application folder; otherwise, the application's parent (i.e. solution) folder |
| `dockerfile` | The path to the Dockerfile used to build the image. | The file `Dockerfile` in the application folder |
| `labels` | The set of labels added to the image. | `com.microsoft.created-by` = `visual-studio-code` |
| `tag` | The tag added to the image. | `<Application Name>:dev` |
| `target` | The target (stage) of the Dockerfile from which to build the image. | `base`

Example build customizations:

```json
{
    "configurations": [
        {
            "name": "Launch .NET Core in Docker",
            "type": "docker-coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "dockerBuild": {
                "args": {
                    "arg1": "value1",
                    "arg2": "value2"
                },
                "context": "${workspaceFolder}/src",
                "dockerfile": "${workspaceFolder}/src/Dockerfile",
                "labels": {
                    "label1": "value1",
                    "label2": "value2"
                },
                "tag": "mytag",
                "target": "publish"
            }
        }
    ]
}
```

### Docker Run Customization

Customize the Docker container run process by adding properties under the `dockerRun` configuration property.

| Property | Description | Default |
| --- | --- | --- |
| `containerName` | The name of the container. | `<Application Name>-dev` |
| `env` | Environment variables applied to the container. | None |
| `envFiles` | Files of environment variables read in and applied to the container. Environment variables are specified one per line, in `<name>=<value>` format. | None |
| `extraHosts` | Hosts to be added to the container's `hosts` file for DNS resolution. | None |
| `labels` | The set of labels added to the container. | `com.microsoft.created-by` = `visual-studio-code` |
| `network` | The network to which the container will be connected. Use values as described in the [Docker run documentation](https://docs.docker.com/engine/reference/run/#network-settings). | `bridge` |
| `networkAlias` | The network-scoped alias to assign to the container. | None |
| `ports` | Ports that are going to be mapped on the host. | All ports exposed by the Dockerfile will be bound to a random port on the host machine |
| `volumes` | Volumes that are going to be mapped to the container. | None |

#### ports
| Property | Description | Required | Default |
| --- | --- | --- | --- |
| `hostPort` | Port number to be bound on the host. | No | None |
| `containerPort` | Port number of the container to be bound. | Yes | None |
| `protocol` | Specific protocol for the binding (`tcp | udp`). If no protocol is specified it will bind both. | No | None |

#### volumes
| Property | Description | Required | Default |
| --- | --- | --- | --- |
| `localPath` | Path on local machine that will be mapped. The folder will be created if it does not exist. Path may use the `${workspaceFolder}` variable when needed. | Yes | None |
| `containerPath` | Path where the volume will be mapped within the container. The folder will be created if it does not exist. | Yes | None |
| `permissions` | Permissions for the container for the mapped volume, `rw` for read-write or `ro` for read-only. | Yes | `rw` |

Example run customization:

```json
{
    "configurations": [
        {
            "name": "Launch .NET Core in Docker",
            "type": "docker-coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "dockerRun": {
                "containerName": "my-container",
                "env": {
                    "var1": "value1",
                    "var2": "value2"
                },
                "envFiles": [
                    "${workspaceFolder}/staging.env"
                ],
                "labels": {
                    "label1": "value1",
                    "label2": "value2"
                },
                "network": "host",
                "networkAlias": "mycontainer",
                "ports": [
                    {
                        "hostPort": 80,
                        "containerPort": 80
                    },
                    {
                        "containerPort": 443
                    },
                    {
                        "containerPort": 6029,
                        "protocol": "udp"
                    },
                    {
                        "containerPort": 6029,
                        "protocol": "tcp"
                    },
                    {
                        "hostPort": 4562,
                        "containerPort": 5837,
                        "protocol": "tcp"
                    }
                ],
                "extraHosts": [
                    {
                        "hostname": "some-hostname",
                        "ip": "some-ip"
                    },
                    {
                        "hostname": "some-other-hostname",
                        "ip": "some-other-ip"
                    }
                ],
                "volumes": [
                    {
                        "localPath": "path-on-host-machine",
                        "containerPath": "path-inside-container",
                        "permissions": "ro|rw"
                    }
                ]
            }
        }
    ]
}
```