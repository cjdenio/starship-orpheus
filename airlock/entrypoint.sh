#!/bin/bash

# Create the user
useradd -ms /bin/bash -p "$(openssl passwd -1 $PASSWORD)" crew

# Setup the HTTP endpoint
echo "export SPACEDINO_URL=\"$SPACEDINO_URL\"" > /etc/profile.d/starship.sh

# Start up the SSH server
/usr/sbin/sshd -D
