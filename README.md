# Starship _Orpheus_

A multiplayer escape-room-like event for the [Hack Club Slack](https://hackclub.com/slack)

## Notable files

`src/challenges/` - contains challenges

`src/challenges/index.ts` - re-exports challenges in a specific order

---

`src/config.ts` - contains config stuff, notably data used to bootstrap Bolt event listeners

`src/transcript.ts` - has some stuff that the bot says

---

`src/airlock/` - contains all the stuff for the airlock challenge (which involved SSH-ing into a VM, which was actually a Docker container)

`src/airlock/airlockctl` - that's the code for the `airlockctl` CLI inside the VM

`src/airlock/run` - script for quickly starting up a VM for every team

`src/airlock/passwords.json` - contains the SSH passwords for each VM (will be defunct by the time this repo is made public)