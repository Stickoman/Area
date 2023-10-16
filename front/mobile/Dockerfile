FROM beevelop/cordova:latest as build

ARG GRADLE_VERSION=8.4

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update && apt-get install -y default-jdk default-jre
RUN JAVA_LOCATION=$(whereis java | awk '{print $2}')

RUN while true; do echo 'y'; sleep 2; done | sdkmanager "build-tools;33.0.2"

ENV JAVA_HOME $JAVA_LOCATION
ENV PATH $JAVA_HOME/bin:$PATH
ENV ANDROID_HOME /opt/android
ENV ANDROID_SDK_ROOT ${ANDROID_HOME}/sdk
ENV GRADLE_USER_HOME /opt/gradle
ENV PATH $PATH:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$GRADLE_USER_HOME/bin

RUN npm run build-cordova
RUN cordova platform add android

RUN cordova build android

RUN mkdir -p /usr/src/app/shared

RUN cp /usr/src/app/platforms/android/app/build/outputs/apk/debug/app-debug.apk /usr/src/app/shared/client.apk
