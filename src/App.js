import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Body from './components/Body';
import Intro from './components/Intro';
import { useStore } from './reducer/useStore';
import { baseUrl } from './utils/BaseUrl';

function App() {

  const setPosts = useStore(state => state.setPosts);
  const [intro, setintro] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/posts`)
    .then(res => {
      setPosts(res.data);
      setintro(false);
    })
  }, [setPosts])


  return (
    <>
    {
      intro ? <Intro />:<Body />
    }
    </>
  );
}

export default App;
