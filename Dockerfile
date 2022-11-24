FROM node:latest

EXPOSE 19000 19001 19002

ENV ADB_IP="192.168.42.247"
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.42.129"
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS="0.0.0.0"

RUN apt-get update && \
  apt-get install android-tools-adb -y
WORKDIR /app

COPY package.json yarn.lock app.json ./

RUN yarn global add expo-cli && \
  yarn install && \
  yarn --network-timeout 100000

CMD adb connect $ADB_IP && \
  yarn start --tunnel