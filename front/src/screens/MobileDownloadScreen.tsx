import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function MobileDownloadScreen(): React.JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = 'http://localhost:8080/api/mobile';

    setTimeout(() => navigate('/profile'), 1000);
  }, []);

  return (
    <div>
        <p>Downloading file...</p>
    </div>
  );
}

export default MobileDownloadScreen;
