# Docker Tasks

## Overview
Beginning in version 0.9.0, the Docker extension adds several Visual Studio Code tasks. These tasks can be used to control the behavior of Docker build and run, and form the basis of container startup for debugging.

## Docker Build
The `docker-build` task enables full control over the command used to build the Docker image.

### Example
TODO

### Properties
Here are the properties available for configuration within `tasks.json`:

| Property | Description |
| --- | --- |
| `dockerBuild` | Options for controlling the `docker build` command executed (see below). |
| `platform` | Optional. This determines the platform, e.g. .NET Core or Node.js, and gives hints to automatically determine properties for the above `dockerBuild` option. |
| `netCore` | Optional. For .NET Core projects, this controls various options (see below). |
| `node` | Optional. For Node.js projects, this controls various options (see below). |

`dockerBuild` object properties:
| Property | Description |
| --- | --- |
| `buildArgs` | Optional. Build arguments applied to the command line. This is a set of key-value pairs. Equivalent to the `--build-arg` command line option. |
| `context` | *Required. Optional. The path to the `docker build` context. |
| `dockerfile` | *Required. The path to the Dockerfile. Equivalent to the `-f` or `--file` command line option. |
| `labels` | Optional. Labels added to the Docker image. This is a set of key-value pairs. Equivalent to the `--label` command line option. |
| `tag` | *Required. The tag applied to the Docker image. Equivalent to the `-t` or `--tag` command line option. |
| `target` | Optional. The target in the Dockerfile to build to. Equivalent to the `--target` command line option. |
| `pull` | Optional. Whether or not to pull new base images before building. Equivalent to the `--pull` command line option. |

`netCore` object properties:
| Property | Description |
| --- | --- |
| `appProject` | *Required. The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with the Dockerfile and `docker-build` task. |

`node` object properties:
| Property | Description |
| --- | --- |
| `package` | *Required. The path to the `package.json` file associated with the Dockerfile and `docker-build` task. |

*Note: Required properties may be automatically inferred based on the option for `platform`.


## Docker Run
The `docker-run` task enables full control over the command used to run the Docker image.

### Example
TODO

### Properties
Here are the properties available for configuration within `tasks.json`:

| Property | Description |
| --- | --- |
| `dockerRun` | Options for controlling the `docker run` command executed (see below). |
| `platform` | Optional. This determines the platform, e.g. .NET Core or Node.js, and gives hints to automatically determine properties for the above `dockerRun` option. |
| `netCore` | Optional. For .NET Core projects, this controls various options (see below). |
| `node` | Optional. For Node.js projects, this controls various options (see below). |

`dockerRun` object properties:
| Property | Description |
| --- | --- |
| `command` | Optional. The command to run upon starting the container. |
| `containerName` | Optional. The name given to the started container. Equivalent to the `--name` command line option. |
| `env` | Optional. Environment variables set in the container. This is a set of key-value pairs. Equivalent to the `-e` or `--env` command line option. |
| `envFiles` | Optional. This is a list of `.env` files. Equivalent to the `--env-file` command line option. |
| `image` | *Required. The name (tag) of the image to run. |
| `labels` | Optional. Labels given to the started container. This is a set of key-value pairs. Equivalent to the `--label` command line option. |
| `network` | Optional. The name of the network to which the container will be connected. Equivalent to the `--network` command line option. |
| `networkAlias` | Optional. The network-scoped alias for the started container. Equivalent to the `--network-alias` command line option. |
| `os` | Optional. Default is `Linux`, the other option is `Windows`. The container operating system used. |
| `ports` | Optional. The ports to map from host to container. This is a list of objects (see below). Equivalent to the `-p` or `--publish` command line option. |
| `extraHosts` | Optional. The hosts to add to the container for DNS resolution. This is a list of objects (see below). Equivalent to the `--add-host` command line option. |
| `volumes` | Optional. The volumes to map into the started container. This is a list of objects (see below). Equivalent to the `-v` or `--volume` command line option. |

`ports` object properties:
| Property | Description |
| --- | --- |
| `hostPort` | Optional. The port number bound on the host. |
| `containerPort` | Required. The port number bound on the container. |
| `protocol` | Optional. The protocol for the binding (`tcp` or `udp`). |

`extraHosts` object properties:
| Property | Description |
| --- | --- |
| `hostname` | Required. The hostname for DNS resolution. |
| `ip` | Required. The IP address associated with the above hostname. |

`volumes` object properties:
| Property | Description |
| --- | --- |
| `localPath` | Required. The path on the local machine that will be mapped. |
| `containerPath` | Required. The path in the container to which the local path will be mapped. |
| `permissions` | Optional. Permissions the container has on the mapped path. Can be `ro` (read-only) or `rw` (read-write). |

`netCore` object properties:
| Property | Description |
| --- | --- |
| `appProject` | *Required. The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with `docker-run` task. |
| `configureSsl` | Optional. Whether to configure ASP.NET Core SSL certificates and other settings to enable SSL on the service in the container. |

`node` object properties:
| Property | Description |
| --- | --- |
| `enableDebugging` | Optional. Whether or not to enable debugging within the container. |
| `inspectMode` | Optional. Whether debugging should break immediately upon application start. |
| `inspectPort` | Optional. The port on which debugging should occur. |
| `package` | *Required. The path to the `package.json` file associated with the `docker-run` task. |

*Note: Required properties may be automatically inferred based on the option for `platform`.
