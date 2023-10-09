FROM node:20 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g cordova

RUN npm run build-cordova
RUN cordova platform add android

RUN cordova build android

# Copy the APK to the final image
FROM node:20

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/platforms/android/app/build/outputs/apk/debug/app-debug.apk ./app-debug.apk

CMD ["cordova", "run", "android"]
