import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useRef } from 'react';

const sounds = [
  {
    key: 'Q',
    track: 'audio/Ane.m4a',
  },
  {
    key: 'W',
    track: 'audio/AsNuoruSventeSvest.m4a',
  },
  {
    key: 'E',
    track: 'audio/AsNuuuohruSventeSvest.m4a',
  },
  {
    key: 'A',
    track: 'audio/AteikSakau.m4a',
  },
  {
    key: 'S',
    track: 'audio/DuokCigarete.m4a',
  },
  {
    key: 'D',
    track: 'audio/Oioioioioi.m4a',
  },
  {
    key: 'Z',
    track: 'audio/PenkiusSimtus.m4a',
  },
  {
    key: 'X',
    track: 'audio/PiskIGalvaKoStovi.m4a',
  },
  {
    key: 'C',
    track: 'audio/TauOperacijaReikPadarytGalvos.m4a',
  }
];

const DrumPad = ({ text, audio }) => {
  const audioRef = useRef();

  useEffect(() => {
    const handleEnded = () => {
      const parent = audioRef.current.parentNode;
      parent.classList.remove(styles.active);

      const display = parent.parentNode;
      display.querySelector('h1').innerText = "Play a sound";
    };

    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSound = () => {
    audioRef.current.play();

    const id = audioRef.current.id;

    const parent = audioRef.current.parentNode;
    parent.classList.add(styles.active);

    const display = parent.parentNode;
    display.querySelector('h1').innerText = `${id} is playing`;
  };

  return (
    <div className={styles.drumPad} onClick={playSound} id={`drum-${text}`}>
      {text}
      <audio ref={audioRef} src={audio} className={styles.clip} id={text} />
    </div>
  );
};

export default function Home() {
  const handleKeyDown = (e) => {
    const id = e.key.toUpperCase();
    const audio = document.getElementById(id);

    if (audio) {
      audio.currentTime = 0;
      const parent = audio.parentNode;
      parent.classList.add(styles.active);

      const display = parent.parentNode;
      display.querySelector('h1').innerText = `${id} is playing`;
      audio.play();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Drum Machine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <div id={styles.display} className={styles.display}>
            <h1>Play a sound</h1>
            {sounds.map((sound, index) => (
              <DrumPad text={sound.key} key={index} audio={sound.track} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}