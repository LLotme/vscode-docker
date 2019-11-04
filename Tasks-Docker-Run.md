# Docker Run

## Overview

The `docker-run` task runs (i.e. creates/starts) a Docker container using the Docker command line. The task can be used by itself, or as part of a chain of tasks to debug an application within a Docker container.

## Configuration

For running general-purpose Docker containers, use the `dockerRun` property to configure the various Docker run options.

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Image",
            "node": "docker-run",
            "dockerRun": {
                "image": "mongo"
            }
        }
}
```

## Platform Support

While the `docker-run` task can be used to run any Docker image, the extension has explicit support for several platforms that can simplfy configuration by using platform-specific defaults for task options.

### .NET Core

### Node.js

For Node.js Docker images, the `docker-run` task infers options based on the application's `package.json`.  For example:

 - The container image is inferred from a dependent `docker-build` task (if specified) or derived from the application package name, itself inferred from the `name` property within `package.json` or the base name of the folder in which it resides.
 
#### Run a Node.js Docker container with its default platform options

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Node Image",
            "node": "docker-run",
            "platform": "node"
        }
}
```

#### Run a Node.js Docker container with Node-specific options

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Node Image",
            "type": "docker-run",
            "node": {
                "enableDebugging": true
            }
        }
}
```

## Task Reference

Here are the properties available for configuration within `tasks.json` (note that *required properties may be automatically inferred based on the option for `platform`):

| Property | Description |
| --- | --- |
| `dockerRun` | *Required. Options for controlling the `docker run` command executed ([see below](#dockerRun-object-properties)). |
| `platform` | Optional. This determines the platform, e.g. .NET Core or Node.js, and gives hints to automatically determine properties for the above `dockerRun` option. |
| `netCore` | Optional. For .NET Core projects, this controls various options ([see below](#netCore-object-properties-docker-run-task)). |
| `node` | Optional. For Node.js projects, this controls various options ([see below](#node-object-properties-docker-run-task)). |

### `dockerRun` object properties:

| Property | Description | CLI Equivalent | Default |
| --- | --- | --- | --- |
| `image` | *Required. The name (tag) of the image to run. | IMAGE |
| `command` | Optional. The command to run upon starting the container. | COMMAND [ARG...] |
| `containerName` | Optional. The name given to the started container. | `--name` |
| `env` | Optional. Environment variables set in the container. This is a list of key-value pairs. | `-e` or `--env` |
| `envFiles` | Optional. This is a list of `.env` files. | `--env-file` |
| `labels` | Optional. Labels given to the started container. This is a list of key-value pairs. | `--label` |
| `network` | Optional. The name of the network to which the container will be connected. | `--network` |
| `networkAlias` | Optional. The network-scoped alias for the started container. | `--network-alias` |
| `os` | Optional. Default is `Linux`, the other option is `Windows`. The container operating system used. | N/A |
| `ports` | Optional. The ports to publish (i.e. map) from container to host. This is a list of objects ([see below](#ports-object-properties)). | `-p` or `--publish` |
| `portsPublishAll` | Optional. Whether to publish all ports exposed by the Docker image. | `-P ` | `true` if no ports are specifically published. |
| `extraHosts` | Optional. The hosts to add to the container for DNS resolution. This is a list of objects ([see below](#extraHosts-object-properties)). | `--add-host` |
| `volumes` | Optional. The volumes to map into the started container. This is a list of objects ([see below](#volumes-object-properties)). | `-v` or `--volume` |

### `ports` object properties:

| Property | Description | Default |
| --- | --- | --- |
| `containerPort` | Required. The port number bound on the container. |
| `hostPort` | Optional. The port number bound on the host. |
| `protocol` | Optional. The protocol for the binding (`tcp` or `udp`). | `tcp` |

### `extraHosts` object properties:

| Property | Description |
| --- | --- |
| `hostname` | Required. The hostname for DNS resolution. |
| `ip` | Required. The IP address associated with the above hostname. |

### `volumes` object properties:

| Property | Description | Default |
| --- | --- | --- |
| `localPath` | Required. The path on the local machine that will be mapped. |
| `containerPath` | Required. The path in the container to which the local path will be mapped. |
| `permissions` | Optional. Permissions the container has on the mapped path. Can be `ro` (read-only) or `rw` (read-write). | Container dependent.|

### `netCore` object properties:

| Property | Description |
| --- | --- |
| `appProject` | *Required. The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with `docker-run` task. |
| `configureSsl` | Optional. Whether to configure ASP.NET Core SSL certificates and other settings to enable SSL on the service in the container. |

### `node` object properties:

| Property | Description | Default |
| --- | --- | --- |
| `package` | Inferred. The path to the `package.json` file associated with the `docker-run` task. | The file `package.json` in the root workspace folder. |
| `enableDebugging` | Optional. Whether or not to enable debugging within the container. | `false` |
| `inspectMode` | Optional. Defines the initial interaction between the application and the debugger (`default` or `break`). The value `default` allows the application to run until the debugger attaches. The value `break` prevents the application from running until the debugger attaches. | `default` |
| `inspectPort` | Optional. The port on which debugging should occur. | `9229` |
