# Xupopter Client

Simple interface to manage Xupopter recipes aswell as it's runners.

## Usage

You can either use the docker container (recommended as contains both the backend and a runner) or manually run it.

### Docker
```
version: "3.3"
services:
  xupopter:
    image: ghcr.io/tetreum/xupopter_client:latest
    container_name: xupopter
    ports:
      - 8088:8088
    volumes:
      - /path/to/config:/app/config # Make sure your local config directory exists
```

### Manual
1. `npm i`
2. `npm run dev`
3. You can now access the interface from http://127.0.0.1:8088/
If you want to run recipes, you will also have to run a runner instance.

### DB

Push changes: `npx prisma db push`

### Debugging tools
- https://inloop.github.io/sqlite-viewer/