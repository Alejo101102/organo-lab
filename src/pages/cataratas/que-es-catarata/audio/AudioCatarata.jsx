import { Html, PositionalAudio } from '@react-three/drei';
import React, { useCallback, useRef, useState } from 'react';
import './AudioCatarata.css';
import './AudioCatarata.css'; 

const AudioCatarata = () => {
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
            <Html position={[7, 2, 0]} center>
                <button className="catarata-audio-button" onClick={handleClick} >
                    {isPlaying ? "PAUSAR AUDIO" : "REPRODUCIR AUDIO"}
                </button>
            </Html>
            <group>
                <PositionalAudio 
                    ref={audioRef}
                    url="/sounds/catarata/catarata.mp3"
                    autoplay={false}
                    loop={true}
                    distance={5}
                />
            </group>
        </>
    );
};

export default AudioCatarata;