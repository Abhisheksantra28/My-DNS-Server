```bash
sudo systemctl stop systemd-resolved
sudo systemctl disable systemd-resolved

sudo rm /etc/resolv.conf
sudo nano /etc/resolv.conf

nameserver 8.8.8.8
nameserver 8.8.4.4



sudo nano /etc/hosts
127.0.0.1 ip-172-31-13-115 // add the following line in the end



sudo mkdir -p /etc/docker
sudo nano /etc/docker/daemon.json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}


sudo docker network prune
sudo docker volume prune
sudo docker image prune
sudo docker container prune

sudo reboot
```

