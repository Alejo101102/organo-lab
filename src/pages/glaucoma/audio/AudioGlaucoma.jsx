import { Html, PositionalAudio } from '@react-three/drei';
import React, { useCallback, useRef, useState } from 'react';
import './AudioGlaucoma.css';

const AudioGlaucoma = () => {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = useCallback(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                audioRef.current.setVolume(10);
                setIsPlaying(true);
            }
        }
    }, [isPlaying]);

    return (
        <>
            <Html position={[-5, 1.5, 0]} center>
                <button className="glaucoma-audio-button" onClick={handleClick} >
                    {isPlaying ? "PAUSAR AUDIO" : "REPRODUCIR AUDIO"}
                </button>
            </Html>
            <group>
                <PositionalAudio 
                    ref={audioRef}
                    url="/sounds/glaucoma/tratamiento-glaucoma.mp3"
                    autoplay={false}
                    loop={true}
                    distance={5}
                />
            </group>
        </>
    );
};

export default AudioGlaucoma;