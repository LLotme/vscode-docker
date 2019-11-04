# Docker Build

## Overview

The `docker-build` task builds Docker images using the Docker command line. The task can be used by itself, or as part of a chain of tasks to run and/or debug an application within a Docker container.

## Configuration

For building general-purpose Docker images, use the `dockerBuild` property to configure the various Docker build options.

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build Image",
            "node": "docker-build",
            "dockerBuild": {
                "dockerfile": "${workspaceFolder}/Dockerfile",
                "context": "${workspaceFolder}"
            }
        }
}
```

## Platform Support

While the `docker-build` task can be used to build any Docker image, the extension has explicit support for several platforms that can simplfy configuration by using platform-specific defaults for task options.

### .NET Core

### Node.js

For Node.js Docker images, the `docker-build` task infers options based on the application's `package.json`.  For example:

 - The Dockerfile is inferred to be in the same directory as the `package.json`.
 - The Docker build context is inferred to be the same directory as the `package.json`.
 - The Docker image tag is inferred from the application's `name` property in `package.json` (if defined), else the base name of the folder in which `package.json` resides.

#### Build a Node.js Docker image with its default platform options

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build Node Image",
            "type": "docker-build",
            "platform": "node"
        }
}
```

#### Build a Node.js Docker image with Node-specific options

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build Node Image",
            "type": "docker-build",
            "node": {
                "package": "${workspaceFolder}/package.json"
            }
        }
}
```

## Task Reference

Here are the properties available for configuration within `tasks.json` (note that *required properties may be automatically inferred based on the option for `platform`):

| Property | Description |
| --- | --- |
| `dockerBuild` | *Required. Options for controlling the `docker build` command executed ([see below](#dockerBuild-object-properties)). |
| `platform` | Optional. This determines the platform, e.g. .NET Core or Node.js, and gives hints to automatically determine properties for the above `dockerBuild` option. |
| `netCore` | Optional. For .NET Core projects, this controls various options ([see below](#netCore-object-properties-docker-build-task)). |
| `node` | Optional. For Node.js projects, this controls various options ([see below](#node-object-properties-docker-build-task)). |

### `dockerBuild` object properties:

| Property | Description | CLI Equivalent |
| --- | --- | --- |
| `context` | *Required. The path to the Docker build context. | PATH |
| `dockerfile` | *Required. The path to the Dockerfile. | `-f` or `--file` |
| `tag` | *Required. The tag applied to the Docker image. | `-t` or `--tag` |
| `buildArgs` | Optional. Build arguments applied to the command line. This is a list of key-value pairs. | `--build-arg` |
| `labels` | Optional. Labels added to the Docker image. This is a list of key-value pairs. | `--label` |
| `target` | Optional. The target in the Dockerfile to build to. | `--target` |
| `pull` | Optional. Whether or not to pull new base images before building. | `--pull` |

### `netCore` object properties:

| Property | Description |
| --- | --- |
| `appProject` | *Required. The .NET Core project file (`.csproj`, `.fsproj`, etc.) associated with the Dockerfile and `docker-build` task. |

### `node` object properties:

| Property | Description | Default |
| --- | --- | --- |
| `package` | Inferred. The path to the `package.json` file associated with the Dockerfile and `docker-build` task. | The file `package.json` in the root workspace folder.
