FROM openjdk:8 as build

ARG GRADLE_VERSION=7.6

WORKDIR /usr/src/app

# NodeJS
RUN echo https://deb.nodesource.com/setup_20.x
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt -qq install -y nodejs

COPY package*.json ./
RUN npm install

COPY . .

ENV JAVA_HOME /usr/local/openjdk-8
ENV ANDROID_HOME /usr/local/Android
ENV ANDROID_SDK_ROOT ${ANDROID_HOME}
ENV GRADLE_USER_HOME /opt/gradle
ENV PATH $PATH:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$GRADLE_USER_HOME/bin

# Gradle
RUN wget -P /tmp https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip && \
    unzip -d /opt /tmp/gradle-${GRADLE_VERSION}-bin.zip && \
        ln -s /opt/gradle-${GRADLE_VERSION} /opt/gradle

# Android
RUN curl -so /tmp/build-tools-33.0.2-linux.zip https://dl.google.com/android/repository/build-tools_r33.0.2-linux.zip && \
    mkdir -p $ANDROID_SDK_ROOT/cmdline-tools/tools && \
    unzip -qd $ANDROID_SDK_ROOT/cmdline-tools/tools /tmp/build-tools-33.0.2-linux.zip && \
    rm /tmp/build-tools-33.0.2-linux.zip

# Accept Android SDK licenses
RUN mkdir -p $ANDROID_SDK_ROOT/licenses
RUN echo -e "\n8933bad161af4178b1185d1a37fbf41ea5269c55\nd56de5a90d46f39b24cc9a4e9c18e607" > $ANDROID_SDK_ROOT/licenses/android-sdk-license
RUN echo -e "24333f8a63b6825ea9c5514f83c2829b004d1fee6" > $ANDROID_SDK_ROOT/licenses/android-sdk-preview-license

RUN npm install -g cordova

RUN npm run build-cordova
RUN cordova platform add android

RUN cordova build android

# Copy the APK to the final image
FROM node:20

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/platforms/android/app/build/outputs/apk/debug/app-debug.apk ./app-debug.apk

CMD ["cordova", "run", "android"]
