import { useEffect, useState } from "react"

function getLocationHash(): string{
  if(typeof window !== 'undefined'){
    return window.location.hash;
  }
  return '';
}

function setLocationHash(newHash: string){
  if(typeof window !== 'undefined'){
    window.location.hash = newHash;
  }
}

export default function useHash(): [string, (newHash: string) => void] {
  const [hash, setHash] = useState<string>(() => getLocationHash());

  useEffect(() => {
    function hashChangeListener(){
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', hashChangeListener);
    return () => window.removeEventListener('hashchange', hashChangeListener);
  }, []);

  return [hash, setLocationHash];
}