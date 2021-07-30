#!/bin/bash

useradd -ms /bin/bash -p "$(openssl passwd -1 $PASSWORD)" crew

/usr/sbin/sshd -D
