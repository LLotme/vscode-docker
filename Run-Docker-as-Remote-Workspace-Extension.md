VS Code extensions run as either a "Workspace" extension (aka in the remote environment) or as a "UI" extension (aka in the local environment). However, many Docker features are not supported when running as a "UI" extension. Instead, a prompt like this will be shown:

![Screen Shot 2019-08-28 at 2 55 03 PM](https://user-images.githubusercontent.com/11282622/63895385-d9a78f00-c9a3-11e9-9125-cbbc25fac6b4.png)

Follow these steps to make the Docker extension run in the remote environment:
1. Select the option to switch
1. Reload VS Code
1. Navigate to the "Extensions" view
1. Search for "Docker"
1. Install the extension in the remote environment

![Screen Shot 2019-09-10 at 11 17 29 AM](https://user-images.githubusercontent.com/11282622/64640109-30f32980-d3be-11e9-9a27-3d05f2f70039.png)

And you're good to go! 🎉

## Notes

* If you want to work with Docker in the local environment, it's recommended to open up a second instance of VS Code outside your remote environment. We are tracking full support for running as a "UI" extension in [#1260](https://github.com/microsoft/vscode-docker/issues/1260).
* If you think the above warning is incorrectly blocking functionality that should work, you can disable it by setting `docker.showRemoteWorkspaceWarning` to `true`.
* You can manually control where the extension is run with the following setting:
    ```json
    "remote.extensionKind": {
        "ms-azuretools.vscode-docker": "workspace"
    }
    ```