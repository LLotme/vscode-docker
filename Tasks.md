# Docker Tasks


## Overview
Beginning in version 0.9.0, the Docker extension adds several Visual Studio Code tasks. These tasks can be used to control the behavior of Docker [build](#docker-build) and [run](#docker-run), and form the basis of container startup for debugging.

The tasks allow for a great deal of configuration. Generally speaking, the ultimate configuration that is used is a combination of universal defaults, platform-specific defaults (e.g. .NET Core and Node.js), and user input. As a rule we respect user input as authoritative anytime it conflicts with defaults, _even if it results in debugging not working_. Our philosophy is that the user knows best.


## Docker Build
The `docker-build` task enables control over the command used to build the Docker image.

### Example
TODO

### Properties
Here are the properties available for configuration within `tasks.json` (note that *required properties may be automatically inferred based on the option for `platform`):

| Property | Description |
| --- | --- |
| `dockerBuild` | *Required. Options for controlling the `docker build` command executed ([see below](#dockerBuild-object-properties)). |
| `platform` | Optional. This determines the platform, e.g. .NET Core or Node.js, and gives hints to automatically determine properties for the above `dockerBuild` option. |
| `netCore` | Optional. For .NET Core projects, this controls various options ([see below](#netCore-object-properties-docker-build-task)). |
| `node` | Optional. For Node.js projects, this controls various options ([see below](#node-object-properties-docker-build-task)). |

#### `dockerBuild` object properties:
| Property | Description | CLI Equivalent |
| --- | --- | --- |
| `context` | *Required. The path to the Docker build context. | PATH |
| `dockerfile` | *Required. The path to the Dockerfile. | `-f` or `--file` |
| `tag` | *Required. The tag applied to the Docker image. | `-t` or `--tag` |
| `buildArgs` | Optional. Build arguments applied to the command line. This is a list of key-value pairs. | `--build-arg` |
| `labels` | Optional. Labels added to the Docker image. This is a list of key-value pairs. | `--label` |
| `target` | Optional. The target in the Dockerfile to build to. | `--target` |
| `pull` | Optional. Whether or not to pull new base images before building. | `--pull` |

#### `netCore` object properties (`docker-build` task):
| Property | Description |
| --- | --- |
| `appProject` | *Required. The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with the Dockerfile and `docker-build` task. |

#### `node` object properties (`docker-build` task):
| Property | Description |
| --- | --- |
| `package` | *Required. The path to the `package.json` file associated with the Dockerfile and `docker-build` task. |


## Docker Run
The `docker-run` task enables control over the command used to run the Docker image.

### Example
TODO

### Properties
Here are the properties available for configuration within `tasks.json` (note that *required properties may be automatically inferred based on the option for `platform`):

| Property | Description |
| --- | --- |
| `dockerRun` | *Required. Options for controlling the `docker run` command executed ([see below](#dockerRun-object-properties)). |
| `platform` | Optional. This determines the platform, e.g. .NET Core or Node.js, and gives hints to automatically determine properties for the above `dockerRun` option. |
| `netCore` | Optional. For .NET Core projects, this controls various options ([see below](#netCore-object-properties-docker-run-task)). |
| `node` | Optional. For Node.js projects, this controls various options ([see below](#node-object-properties-docker-run-task)). |

#### `dockerRun` object properties:
| Property | Description | CLI Equivalent |
| --- | --- | --- |
| `image` | *Required. The name (tag) of the image to run. | IMAGE |
| `command` | Optional. The command to run upon starting the container. | COMMAND [ARG...] |
| `containerName` | Optional. The name given to the started container. | `--name` |
| `env` | Optional. Environment variables set in the container. This is a list of key-value pairs. | `-e` or `--env` |
| `envFiles` | Optional. This is a list of `.env` files. | `--env-file` |
| `labels` | Optional. Labels given to the started container. This is a list of key-value pairs. | `--label` |
| `network` | Optional. The name of the network to which the container will be connected. | `--network` |
| `networkAlias` | Optional. The network-scoped alias for the started container. | `--network-alias` |
| `os` | Optional. Default is `Linux`, the other option is `Windows`. The container operating system used. | N/A |
| `ports` | Optional. The ports to map from host to container. This is a list of objects ([see below](#ports-object-properties)). | `-p` or `--publish` |
| `extraHosts` | Optional. The hosts to add to the container for DNS resolution. This is a list of objects ([see below](#extraHosts-object-properties)). | `--add-host` |
| `volumes` | Optional. The volumes to map into the started container. This is a list of objects ([see below](#volumes-object-properties)). | `-v` or `--volume` |

#### `ports` object properties:
| Property | Description |
| --- | --- |
| `containerPort` | Required. The port number bound on the container. |
| `hostPort` | Optional. The port number bound on the host. |
| `protocol` | Optional. The protocol for the binding (`tcp` or `udp`). |

#### `extraHosts` object properties:
| Property | Description |
| --- | --- |
| `hostname` | Required. The hostname for DNS resolution. |
| `ip` | Required. The IP address associated with the above hostname. |

#### `volumes` object properties:
| Property | Description |
| --- | --- |
| `localPath` | Required. The path on the local machine that will be mapped. |
| `containerPath` | Required. The path in the container to which the local path will be mapped. |
| `permissions` | Optional. Permissions the container has on the mapped path. Can be `ro` (read-only) or `rw` (read-write). |

#### `netCore` object properties (`docker-run` task):
| Property | Description |
| --- | --- |
| `appProject` | *Required. The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with `docker-run` task. |
| `configureSsl` | Optional. Whether to configure ASP.NET Core SSL certificates and other settings to enable SSL on the service in the container. |

#### `node` object properties (`docker-run` task):
| Property | Description |
| --- | --- |
| `package` | *Required. The path to the `package.json` file associated with the `docker-run` task. |
| `enableDebugging` | Optional. Whether or not to enable debugging within the container. |
| `inspectMode` | Optional. Whether debugging should break immediately upon application start. |
| `inspectPort` | Optional. The port on which debugging should occur. |
