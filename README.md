# drinks-web

<a href="https://www.buymeacoffee.com/usPQC4r" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-violet.png" alt="Buy Me A Coffee" height="40rem"></a>


## How to run the client and server at the same time:

First you need to run the local DNS to the containers names in the host:

```bash
docker run --hostname dns.mageddo --restart=unless-stopped -p 5380:5380 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /etc/resolv.conf:/etc/resolv.conf \
defreitas/dns-proxy-server
```

Then you can run:

```
docker-compose up --build
```

The client will be available at: [web.drinks.local](http://web.drinks.local)