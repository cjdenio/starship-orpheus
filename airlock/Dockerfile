FROM ubuntu:20.04

COPY ./motd /etc/motd
COPY ./airlockctl /bin/airlockctl

# Disable login messages
RUN chmod -x /etc/update-motd.d/* && rm /etc/legal

RUN apt update -y && \
    apt install -y openssh-server curl

RUN mkdir -p /run/sshd

RUN useradd -ms /bin/bash -p "$(openssl passwd -1 password)" crew
COPY ./README /home/crew/README

CMD ["/usr/sbin/sshd", "-D"]
