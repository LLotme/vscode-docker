# Debugging within Docker Containers

With version 0.9.0, the Docker extension provides more support for debugging applications running within Docker containers, such as scaffolding debug launch configurations for attaching a debugger to those applications running within a container.

## Platform Support

Debugging within Docker containers is currently supported for both .NET Core and Node.js applications. 

### .NET Core

> The previous (Preview) .NET Core Docker debugging support is being deprecated. You can still find documentation on that support [here](Debug-NetCore-Deprecated.md).

> Debugging .NET Core applications within Windows Docker containers is not currently supported.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch .NET Core in Docker",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "Run Docker Container",
            "netCore": {
                "appProject": "${workspaceFolder}/project.csproj"
            }
        }
    ]
}
```

### Node.js

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Node.js in Docker",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "Run Docker Container",
            "platform": "node"
        }
    ]
}
```

## Configuration Reference

| Property | Description |
| --- | --- |
| `containerName` | Name of the container used for debugging. |
| `dockerServerReadyAction` | Options for launching a browser to the Docker container. Similar to serverReadyAction, but replaces container ports with host ports. |
| `removeContainerAfterDebug` | Whether to remove the debug container after debugging. |
| `platform` | The target plaform for the application. Can be `netCore` or `node`. |
| `netCore` | Options for debugging .NET Core projects in Docker. |
| `node` | Options for debugging Node.js projects in Docker. |

### `dockerServerReadyAction` Object Properties

| Property | Description |
| --- | --- |
| `action` | The action to take when the pattern is found. Can be `debugWithChrome` or `openExternally`. |
| `containerName` | The container name to match the host port. |
| `pattern` | The regex pattern to look for in Debug console output. |
| `uriFormat` | The URI format to launch. |
| `webRoot` | The root folder from which web pages are served. Used only when `action` is set to `debugWithChrome`. |

### `netCore` Object Properties

> Properties passed in the `netCore` object are generally passed on to the .NET Core debug adaptor, even if not specifically listed below. The complete list of debugger properties is in the [OmniSharp VS Code extension documentation](https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger-launchjson.md).

| Property | Description |
| --- | --- |
| `appProject` | The .NET Core project (.csproj, .fsproj, etc.) to debug. |

### `node` Object Properties

> These properties are the same as those described in the [VS Code documentation](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes) for attaching a debugger to Node.js applications. All properties passed in the `node` object will be passed on to the Node.js debug adaptor, even if not specifically listed below.

| Property | Description | Default |
| --- | --- | --- |
| `port` | Optional. The debug port to use. | `9229` |
| `address` | Optional. TCP/IP address of the debug port. |
| `sourceMaps` | Optional. Enable source maps by setting this to `true`. |
| `outFiles` | Optional. Array of glob patterns for locating generated JavaScript files. |
| `autoAttachChildProcesses` | Optional. Track all subprocesses of debuggee and automatically attach to those that are launched in debug mode. |
| `timeout` | Optional. When restarting a session, give up after this number of milliseconds. |
| `stopOnEntry` | Optional. Break immediately when the program launches. |
| `localRoot` | Optional. VS Code's root directory. | The root workspace folder. |
| `remoteRoot` | Optional. Node's root directory within the Docker container. | `/usr/src/app` |
| `smartStep` | Optional. Try to automatically step over code that doesn't map to source files. |
| `skipFiles` | Optional. Automatically skip files covered by these glob patterns. |
| `trace` | Optional. Enable diagnostic output. |