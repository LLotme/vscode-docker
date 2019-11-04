# Docker Tasks


## Overview
Beginning in version 0.9.0, the Docker extension adds several Visual Studio Code tasks. These tasks can be used to control the behavior of Docker [build](Tasks-Docker-Build.md) and [run](Tasks-Docker-Run.md), and form the basis of container startup for debugging.

The tasks allow for a great deal of configuration. Generally speaking, the ultimate configuration that is used is a combination of universal defaults, platform-specific defaults (e.g. .NET Core and Node.js), and user input. As a rule we respect user input as authoritative anytime it conflicts with defaults, _even if it results in debugging not working_. Our philosophy is that the user knows best.
