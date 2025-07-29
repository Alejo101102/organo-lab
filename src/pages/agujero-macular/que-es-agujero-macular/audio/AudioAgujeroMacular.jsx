import { Html, PositionalAudio } from '@react-three/drei';
import React, { useCallback, useRef, useState } from 'react';
import './AudioAgujeroMacular.css';


const AudioAgujeroMacular = () => {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = useCallback(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                audioRef.current.setVolume(2);
                setIsPlaying(true);
            }
        }
    }, [isPlaying]);

    return (
        <>
            <Html position={[7, 2, 0]} center>
                <button className="agumac-audio-button" onClick={handleClick} >
                    {isPlaying ? "PAUSAR AUDIO" : "REPRODUCIR AUDIO"}
                </button>
            </Html>
            <group>
                <PositionalAudio 
                    ref={audioRef}
                    url="/sounds/agujero-macular/tratamiento-agumac.mp3"
                    autoplay={false}
                    loop={true}
                    distance={7}
                />
            </group>
        </>
    );
};

export default AudioAgujeroMacular;