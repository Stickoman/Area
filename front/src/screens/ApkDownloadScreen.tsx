import React from 'react';

function APKDownloadScreen(): React.JSX.Element {
  return (
    <div>
      <p>Downloading the Android version of the mobile client...</p>
      <a href="../../../../../shared/client.apk" download="client.apk">
        Click here to download the APK file
      </a>
    </div>
  );
}

export default APKDownloadScreen;
