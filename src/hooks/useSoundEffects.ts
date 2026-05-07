import { useRef, useCallback, useState, useEffect } from 'react';
import { MUTE_EVENT } from '@/constants/global';
import { SoundEffectType } from '@/types/sound';

/**
 * Custom hook to manage sound effects for gamification.
 * Handles correct/incorrect feedback and lesson completion sounds.
 * Synchronizes mute state across all components and tabs.
 */
export function useSoundEffects() {
    const [isMuted, setIsMuted] = useState(() => {
        const stored = localStorage.getItem('glotrush_muted');
        return stored === 'true';
    });

    const correctAudio = useRef<HTMLAudioElement | null>(null);
    const incorrectAudio = useRef<HTMLAudioElement | null>(null);
    const successAudio = useRef<HTMLAudioElement | null>(null);

    // Initialize audio objects lazily
    const getAudio = useCallback((type: SoundEffectType) => {
        if (type === 'correct') {
            if (!correctAudio.current) {
                correctAudio.current = new Audio('/assets/sounds/correct.mp3');
            }
            return correctAudio.current;
        }
        if (type === 'incorrect') {
            if (!incorrectAudio.current) {
                incorrectAudio.current = new Audio('/assets/sounds/incorrect.mp3');
            }
            return incorrectAudio.current;
        }
        if (type === 'success') {
            if (!successAudio.current) {
                successAudio.current = new Audio('/assets/sounds/success.mp3');
            }
            return successAudio.current;
        }
        return null;
    }, []);

    // Sync state with localStorage and other components
    useEffect(() => {
        const handleSync = () => {
            const stored = localStorage.getItem('glotrush_muted');
            setIsMuted(stored === 'true');
        };

        // Listen for changes from other tabs and other components in the same tab
        window.addEventListener('storage', handleSync);
        window.addEventListener(MUTE_EVENT, handleSync);

        return () => {
            window.removeEventListener('storage', handleSync);
            window.removeEventListener(MUTE_EVENT, handleSync);
        };
    }, []);

    const playSound = useCallback((type: SoundEffectType) => {
        if (isMuted) return;

        const audio = getAudio(type);
        if (audio) {
            audio.currentTime = 0; // Restart if already playing
            audio.play().catch(error => {
                // Ignore errors related to auto-play restrictions or missing files
                console.warn(`Could not play sound ${type}:`, error);
            });
        }
    }, [isMuted, getAudio]); // Dependency on isMuted is crucial to avoid stale closures

    const toggleMute = useCallback(() => {
        const newValue = !isMuted;
        localStorage.setItem('glotrush_muted', String(newValue));
        setIsMuted(newValue);
        // Synchronize all instances in the same tab
        window.dispatchEvent(new Event(MUTE_EVENT));
    }, [isMuted]);

    return {
        playCorrect: useCallback(() => playSound('correct'), [playSound]),
        playIncorrect: useCallback(() => playSound('incorrect'), [playSound]),
        playSuccess: useCallback(() => playSound('success'), [playSound]),
        isMuted,
        toggleMute
    };
}
