# Dishes around the world

This project was made after I challenged myself to cook a dish from every
country. I wanted to have a nice and easy way of documenting my progress.

## Development script

To generate a template for every country, I used a
[script](scripts/generate-templates.js) that parses a
[dataset](scripts/all.json) and creates a template and downloads an SVG
representing the country’s flag.

## Adding a new dish

To publish a new dish:

1. Remove `draft: true` from the country's template.

2. Add a file named `dish.jpeg` in the same directory.

> The image can use formats other than JPEG, such as PNG, GIF, WebP, or SVG.

The build process will automatically publish the dish and optimize the image.

## Deployment

For deployment, I build the project on the server. The way I set this up with
the `compose.yaml` file. It will build the website in the container and put the
output in a directory of the host. The files are server with Caddy server.

For automatic deployment I setup a GitHub action to trigger the compose file.
