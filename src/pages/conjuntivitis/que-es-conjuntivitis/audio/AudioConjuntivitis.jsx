import { Html, PositionalAudio } from '@react-three/drei';
import React, { useCallback, useRef, useState } from 'react';
import './AudioConjuntivitis.css';
import './AudioConjuntivitis.css'; 

const AudioConjuntivitis = () => {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = useCallback(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                audioRef.current.setVolume(1.0);
                setIsPlaying(true);
            }
        }
    }, [isPlaying]);

    return (
        <>
            <Html position={[7, 2, 0]} center>
                <button className="conjuntivitis-audio-button" onClick={handleClick} >
                    {isPlaying ? "PAUSAR AUDIO" : "REPRODUCIR AUDIO"}
                </button>
            </Html>
            <group>
                <PositionalAudio 
                    ref={audioRef}
                    url="/sounds/conjuntivits/Tratamiento-conjuntivitis.mp3"
                    autoplay={false}
                    loop={true}
                    distance={7}
                />
            </group>
        </>
    );
};

export default AudioConjuntivitis;