import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function MobileDownloadScreen(): React.JSX.Element {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    window.location.href = `${API_URL}/api/mobile`;

    setTimeout(() => navigate('/profile'), 1000);
  }, []);

  return (
    <div>
        <p>Downloading file...</p>
    </div>
  );
}

export default MobileDownloadScreen;
