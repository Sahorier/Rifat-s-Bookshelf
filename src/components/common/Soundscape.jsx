import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, CloudRain, Flame, BookOpen } from 'lucide-react';

export const Soundscape = () => {
  const { soundscape, toggleSoundscape, setSoundscape } = useApp();
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const generatorNodesRef = useRef([]);

  useEffect(() => {
    // If not playing or mode is off, stop any active nodes
    if (!soundscape.isPlaying || soundscape.mode === 'off') {
      generatorNodesRef.current.forEach(node => {
        try { node.stop ? node.stop() : node.disconnect(); } catch (e) {}
      });
      generatorNodesRef.current = [];
      return;
    }

    // Initialize Web Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Master Gain
    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.connect(ctx.destination);
    }
    gainNodeRef.current.gain.setValueAtTime(soundscape.volume, ctx.currentTime);

    // Stop existing nodes before creating new generator
    generatorNodesRef.current.forEach(node => {
      try { node.stop ? node.stop() : node.disconnect(); } catch (e) {}
    });
    generatorNodesRef.current = [];

    if (soundscape.mode === 'rain') {
      // Pink/Brown noise for rain simulation
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        data[i] = (b0 + b1 + b2) * 0.2;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Lowpass filter for soft rain on window
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(gainNodeRef.current);
      noiseSource.start();
      generatorNodesRef.current.push(noiseSource);

    } else if (soundscape.mode === 'fireplace') {
      // Fireplace crackle & low warmth
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Random micro crackles
        const isCrackle = Math.random() < 0.003;
        data[i] = isCrackle ? (Math.random() * 2 - 1) * 0.8 : (Math.random() * 2 - 1) * 0.04;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(gainNodeRef.current);
      noiseSource.start();
      generatorNodesRef.current.push(noiseSource);

    } else if (soundscape.mode === 'library') {
      // Soft gentle brown ambient drone
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 1.5;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(gainNodeRef.current);
      noiseSource.start();
      generatorNodesRef.current.push(noiseSource);
    }

    return () => {
      generatorNodesRef.current.forEach(node => {
        try { node.stop ? node.stop() : node.disconnect(); } catch (e) {}
      });
    };
  }, [soundscape.mode, soundscape.isPlaying]);

  // Adjust volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(soundscape.volume, audioCtxRef.current.currentTime);
    }
  }, [soundscape.volume]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-white/90 dark:bg-ink-900/90 backdrop-blur-md p-2 rounded-full border border-parchment-300 dark:border-ink-700 shadow-xl text-xs font-sans transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-1 pl-2 pr-1">
        <button
          onClick={() => toggleSoundscape('rain')}
          title="বৃষ্টির ধ্বনি (Rain Ambience)"
          className={`p-2 rounded-full transition-colors flex items-center gap-1.5 ${
            soundscape.mode === 'rain' && soundscape.isPlaying
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-parchment-700 dark:text-parchment-300 hover:bg-parchment-200 dark:hover:bg-ink-800'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">বৃষ্টি</span>
        </button>

        <button
          onClick={() => toggleSoundscape('fireplace')}
          title="ফায়ারপ্লেস (Cozy Hearth)"
          className={`p-2 rounded-full transition-colors flex items-center gap-1.5 ${
            soundscape.mode === 'fireplace' && soundscape.isPlaying
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-parchment-700 dark:text-parchment-300 hover:bg-parchment-200 dark:hover:bg-ink-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">উষ্ণতা</span>
        </button>

        <button
          onClick={() => toggleSoundscape('library')}
          title="শান্ত লাইব্রেরি (Library Silence)"
          className={`p-2 rounded-full transition-colors flex items-center gap-1.5 ${
            soundscape.mode === 'library' && soundscape.isPlaying
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-parchment-700 dark:text-parchment-300 hover:bg-parchment-200 dark:hover:bg-ink-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">পাঠাগার</span>
        </button>

        {soundscape.isPlaying && (
          <div className="flex items-center gap-1 px-2 border-l border-parchment-300 dark:border-ink-700 ml-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundscape.volume}
              onChange={(e) => setSoundscape(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
              className="w-16 h-1 bg-parchment-300 dark:bg-ink-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <button
              onClick={() => toggleSoundscape('off')}
              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-full"
              title="সাউন্ড বন্ধ করুন"
            >
              <VolumeX className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
