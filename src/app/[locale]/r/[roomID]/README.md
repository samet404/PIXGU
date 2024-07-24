## How game room works ?

Libraries used:

- **Ably** for the signaling mechanism and for the inputs and outputs of the room.
- **simple-peer** for WebRTC communication

First of all, the host creates the room and joins. It connects to the ably signaling channels necessary for webrtc communication. If the player joins the room, it sends him a connection offer. Then the player answers to it and if everything goes well, the player is considered to have joined the room. If the number of users joining the room reaches 4, game begins and the first two person to join is chosen as the painter.

Note: The order of the painter is cyclical. The first two person to enter the room is the first painters and the last persons to enter the room is the last painters.

When the game starts, the first painters always try to draw the randomly assigned theme first. Then the most guessed picture is chosen. And this picture is next to the next 2 pictures to be drawn. And the new paintings have to match the previous ones.

Note: The order of the random theme is designed to match the previous one.
