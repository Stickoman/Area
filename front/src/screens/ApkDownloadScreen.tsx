import React from 'react';

function APKDownloadScreen(): React.JSX.Element {
  const handleDownload = () => {
    const filePath = '../shared/client.apk';
    const a = document.createElement('a');
    a.href = filePath;
    a.download = 'client.apk';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <button onClick={handleDownload}>Télécharger le fichier</button>
    </div>
  );
}

export default APKDownloadScreen;
