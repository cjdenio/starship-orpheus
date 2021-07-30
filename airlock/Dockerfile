FROM ubuntu:20.04

COPY ./motd /etc/motd
COPY ./airlockctl /bin/airlockctl

# Disable login messages
RUN chmod -x /etc/update-motd.d/* && rm /etc/legal

RUN apt update -y && \
    apt install -y openssh-server curl iputils-ping

RUN mkdir -p /run/sshd

COPY ./README /etc/skel

COPY ./entrypoint.sh /
CMD ["/entrypoint.sh"]
