![icon](https://pixgu.com/image/png/startbg.png)

PIXGU is a real-time multiplayer drawing and guessing game platform inspired by popular games like Gartic.io and Skribbl.io. Players take turns drawing pictures while others try to guess what's being drawn. Create private rooms and invite friends to play together!

## Overview

- 🎨 Draw and guess pictures in real-time
- 👥 Create private rooms for friends
- 🌐 P2P connectivity for smooth gameplay
- ⚡ Fast and responsive performance

## Technology Stack

| Technology                                                                      | Purpose                                                                                             |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org)                                                   | Server framework providing image optimization, fast initial page loading, and server-side rendering |
| [React.js](https://react.dev/)                                                  | Frontend UI library for building interactive user interfaces                                        |
| [Socket.io](https://socket.io/)                                                 | WebRTC signaling server for establishing P2P connections                                            |
| [WebRTC](https://webrtc.org/)                                                   | Enables peer-to-peer connections for real-time data exchange during gameplay                        |
| [tRPC](https://trpc.io/)                                                        | End-to-end typesafe API layer                                                                       |
| [Redis](https://docs.keydb.dev/)                                                | In-memory database for caching and fast storage operations                                          |
| [PostgreSQL](https://www.postgresql.org/)                                       | Primary database for persistent data storage                                                        |
| [Drizzle ORM](https://orm.drizzle.team)                                         | Type-safe ORM for database operations                                                               |
| [Tailwind CSS](https://tailwindcss.com)                                         | Utility-first CSS framework for rapid styling                                                       |
| [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) | Handle time calculations and heavy computations off the main thread                                 |
| [Zustand](https://zustand-demo.pmnd.rs/)                                        | Lightweight state management for global application state                                           |
| [Jotai](https://jotai.org/)                                                     | Atomic state management for component-level state                                                   |

### Development Tools

- ESLint for code linting
- Prettier for code formatting
- Bun for fast package management and development

### Related repositories

- [Socket.io server](https://github.com/404nnotfoundddd/PIXGU-SOCKETIO)
- [Socket.io admin client](https://github.com/404nnotfoundddd/PIXGU-SOCKETIO-ADMIN-CLIENT)

### Known issues

- The game is not supports mobile and tablet devices
- There are some bugs causes infinite looping

### Future plans

- Add C code via wasm to improve performance
- Fix small bugs 

### Contributing

You can contribute to this project by forking it and submitting a pull request.
