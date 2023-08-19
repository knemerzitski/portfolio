/*
  Used for managing location hash changes. 
  - Listeners on hash change
  - Enable/disable hash at all
  - Pause/resume hash listeners
  
  For example:

  const hashContext = useHashContext();

  hashContext.set('#examplehash', {
    start() {
      console.log('hashcontext', 'hash #examplehash is visible in location');
    },
    end() {
      console.log('hashcontext', 'hash #examplehash is not longer visible in location');
    }
  });

  hashContext.disable('#examplehash'); // #examplehash no longer works and gets removed from location, triggers end listener
  hashContext.enable('#examplehash');

  hashContext.pause('#examplehash'); // Hash is kept in location, but end listener is triggered
  hashContext.resume('#examplehash'); // Now start listener triggers if hash is still same

  hashContext.end('#examplehash'); // Trigger end listener manually, location hash gets cleared

  hashContext.remove('#examplehash'); // Remove hash

*/


"use client";

import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useRef, useCallback } from "react";

interface Listeners {
  start: () => void,
  end: () => void,
}

interface State {
  started: boolean,
  disabled: boolean,
  listeners: Listeners,
}

interface HashContextInterface {
  set: (hash: string, listeners: Listeners) => void,
  remove: (hash: string) => void,
  end: (hash: string) => void,
  disable: (hash: string) => void,
  enable: (hash: string) => void,
  pause: () => void,
  resume: () => void,
  isPaused: () => boolean,
  push: (hash: string) => void,
}

const HashContext = createContext<HashContextInterface | null>(null);

export function useHashContext() {
  return useContext(HashContext);
}

export function HashContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const states = useRef<{ [key: string]: State }>({});
  const prevHashRef = useRef('');
  const currentHashRef = useRef('');
  const isPausedRef = useRef(false);
  const router = useRouter();


  const handleHashChanged = useCallback((newHash: string) => {
    if (newHash === currentHashRef.current) return;

    // Check disabled
    if (newHash in states.current) {
      const currentState = states.current[newHash];
      if (currentState.disabled) {
        console.log('hashcontext', 'disabled', newHash);
        router.replace(window.location.pathname + window.location.search, { scroll: false });
        return;
      }
    }

    prevHashRef.current = currentHashRef.current;
    currentHashRef.current = newHash;
    console.log('hashcontext', `change ${prevHashRef.current} => ${currentHashRef.current} (states: ${Object.keys(states.current).length})`);

    if (isPausedRef.current) return;

    // End prev
    if (prevHashRef.current in states.current) {
      const endState = states.current[prevHashRef.current];
      if (endState.started) {
        endState.started = false;
        console.log('hashcontext', 'event end', prevHashRef.current);
        endState.listeners.end();
      }
    }

    //Start current
    if (currentHashRef.current in states.current) {
      const startState = states.current[currentHashRef.current];
      if (!startState.started && !startState.disabled) {
        startState.started = true;
        console.log('hashcontext', 'event start', currentHashRef.current);
        startState.listeners.start();
      }
    }
  }, [router]);

  useEffect(() => {
    function onHashChanged() {
      handleHashChanged(window.location.hash);
    };

    handleHashChanged(window.location.hash);

    window.addEventListener('hashchange', onHashChanged);
    return () => window.removeEventListener('hashchange', onHashChanged);
  }, [router, handleHashChanged]);

  const tasksContextInterface: HashContextInterface = {
    set(newHash: string, listeners: Listeners) {
      if (newHash in states.current) {
        this.remove(newHash);
      }

      console.log('hashcontext', 'added', newHash);
      const newState: State = { listeners, started: false, disabled: false, };
      states.current[newHash] = newState;
      if (currentHashRef.current === newHash && !isPausedRef.current) {
        newState.started = true;
        console.log('hashcontext', 'event start', newState);
        newState.listeners.start();
      }
    },
    remove(oldhash: string) {
      if (!(oldhash in states.current)) return;
      const oldState = states.current[oldhash];

      if (oldState.started) {
        oldState.started = false;
        oldState.listeners.end();
      }

      console.log('hashcontext', 'removed', oldhash);
      delete states.current[oldhash];
    },
    end(hash: string) {
      if (!(hash in states.current)) return;
      const hashState = states.current[hash];
      if (hashState.started) {
        hashState.started = false;
        hashState.listeners.end();
        if (prevHashRef.current !== currentHashRef.current) {
          console.log('hashcontext', 'router back');
          router.back();
        } else {
          console.log('hashcontext', 'router replace');
          router.replace(window.location.pathname + window.location.search, { scroll: false });
        }
      }
    },
    pause() {
      if (isPausedRef.current) return;
      isPausedRef.current = true;

      if (currentHashRef.current in states.current) {
        const currentstate = states.current[currentHashRef.current];
        if (currentstate.started) {
          currentstate.started = false;
          console.log('hashcontext', 'event end from pause', currentHashRef.current);
          currentstate.listeners.end();
        }
      }
    },
    resume() {
      if (!isPausedRef.current) return;
      isPausedRef.current = false;

      if (currentHashRef.current in states.current) {
        const currentstate = states.current[currentHashRef.current];
        if (!currentstate.started && currentstate.disabled) {
          currentstate.started = true;
          console.log('hashcontext', 'event start from resume', currentHashRef.current);
          currentstate.listeners.start();
        }
      }
    },
    isPaused() {
      return isPausedRef.current;
    },
    disable(hash: string) {
      if (!(hash in states.current)) return;

      const state = states.current[hash];

      if (state.disabled) return;
      state.disabled = true;

      console.log('hashcontext', 'disabled', hash);

      if (state.started) {
        state.started = false;
        state.listeners.end();
      }

      if (currentHashRef.current === hash) {
        router.replace(window.location.pathname + window.location.search, { scroll: false });
      }
    },
    enable(hash: string) {
      if (!(hash in states.current)) return;

      const state = states.current[hash];

      if (!state.disabled) return;
      state.disabled = false;

      console.log('hashcontext', 'enabled', hash);
    },
    push(hash: string) {
      handleHashChanged(hash);
    }
  }

  return (
    <HashContext.Provider value={tasksContextInterface}>
      {children}
    </HashContext.Provider>
  );
}