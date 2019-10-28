FROM fcgomes92/nginx-node:latest
EXPOSE 80
EXPOSE 3000

RUN yarn

CMD [ "start" ]