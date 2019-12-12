In this guide you will learn how to:
- Create a container image for your application.
- Push the image to a container registry.
- Deploy the image to Azure App Service.

## Prerequisites
- An Azure subscription.
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) and [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extensions must be installed.
- A [**web** application](https://docs.microsoft.com/en-us/azure/app-service/containers/tutorial-custom-docker-image) that produces a docker image. You could also follow [Create a sample ASP .NET Core application](ASP-Net-Core) to create such application.
- You need a [Docker Hub](https://hub.docker.com/) account or an instance of [Azure Container Registry (ACR)](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal).


## Create the application image 
If you already have an image, skip this step and proceed to [Push the image to container registry](#push-the-image-to-container-registry) step.
1. Open the application folder in VS Code.

2. Open Command Palette (`F1`) and use `Docker Images: Build Image...` command to build the image.

    ![Build container image](images/command-build-image.png)

    You can find the image name in the output of the Build Image command, the same can be found in the Images pane of the Docker view.

    ![Build image output](images/terminal-output-build-image.png)

## Push the image to container registry
Before deploying the image to an App Service, the image must be uploaded to a container registry. The image can be uploaded to either [Azure Container Registry (ACR)](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal) or [Docker Hub](https://hub.docker.com/).

1. Open the Docker view and select 'Connect Registry...' icon under Registries group and follow the prompt. Choose the provider (Azure or Docker Hub) and provide the credential to connect to the registry.

    ![Connect to Registry](images/explorer-connect-registry.png)

2. Now the registry will be visible under Registries.

   ![Registries](images/explorer-registries.png)

3. Tag the image. In order to upload an image to a registry, the image needs to be tagged with registry name so that the docker push will upload it to the right registry.
    - The image built in previous section will appear in the Docker view under Images section. Right-click and choose "Tag...".

        ![Tag image](images/explorer-tag-image.png)
    - Specify the new name `<your registry or username>/<image name>:<tag>` and complete the 
    tag action. For example, new image name for ACR would be 'mainacr.azurecr.io/webapp6:latest' and for Docker Hub it would be 'myusername/webapp6:latest'.

4. The newly tagged image will show up in the Docker view under the registry that the image tag points to. Select this image and choose "Push".

    ![Push image](images/explorer-push-image.png)

5. Once the push command is completed. Refresh the registry node where the image is pushed to and the uploaded image will show up.

    ![Refresh registry](images/explorer-refresh-registry.png)

## Deploy the image to Azure App Service
In the previous section, the image is pushed to a remote container registry. Now deploy this image to Azure App Service.
1. In Docker view, navigate to your image under Registries, right-click on the tag, and select "Deploy Image To Azure App Service...".

    ![Deploy to Azure App Service](images/explorer-deploy-to-app-service.png)

2. When prompted, provide the values for the App Service.
    - New web app name: The name must be unique across Azure.
    - Resource group: Select an existing resource group or create a new one.
    - App Service plan: Select an existing App Service Plan or create a new one. (An App Service Plan defines the physical resources that host the website. You can use a basic or free plan tier for this tutorial.).

3. When deployment is complete, Visual Studio Code shows a notification with the website URL.

    ![Deployment complete notification](images/notification-appservice-deployment.png)

4. You can also see the results in the Output panel of Visual Studio Code, in the Docker section.

    ![Deployment completr output](images/output-appservice-deployment.png)

5. To browse the deployed website, you can use Ctrl+Click to open the URL in the Output panel. The new App Service also appears in the Azure view in Visual Studio Code under the App Service section, where you can right-click the website and select Browse Website.

    ![Web Application](images/webapp-homepage.png)