# Airlock control procedure

The Starship _Orpheus_'s twin airlocks are managed through a daemon (or background process) running on this Linux machine.

While the process _should_ restart automatically upon failure, it may occasionally require manual intervention.

The daemon is managed through a wrapper script, `airlockctl`, which exposes several subcommands for managing airlock control.
