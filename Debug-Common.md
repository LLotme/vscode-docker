# Debugging within Docker Containers

## Supported Platforms

### .NET Core

### Node.js

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

| Property | Description |
| --- | --- |
| `appProject` | The .NET Core project (.csproj, .fsproj, etc.) to debug. |

### `node` Object Properties

| Property | Description |
| --- | --- |
| `port` | The debug port to use. |
| `address` | TCP/IP address of the debug port. |
| `sourceMaps` | Enable source maps by setting this to `true`. |
| `outFiles` | Array of glob patterns for locating generated JavaScript files. |
| `autoAttachChildProcesses` | Track all subprocesses of debuggee and automatically attach to those that are launched in debug mode. |
| `timeout` | When restarting a session, give up after this number of milliseconds. |
| `stopOnEntry` | Break immediately when the program launches. |
| `localRoot` | VS Code's root directory. |
| `remoteRoot` | Node's root directory within the Docker container. |
| `smartStep` | Try to automatically step over code that doesn't map to source files. |
| `skipFiles` | Automatically skip files covered by these glob patterns. |
| `trace` | Enable diagnostic output. |