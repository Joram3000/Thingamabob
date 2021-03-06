import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useDispatch, useSelector } from "react-redux";

import {
  selectSeqPattern,
  seqSettings,
} from "../../../store/seqState/selectors";

import { PatternUpdater } from "../../../store/seqState/actions";

let notes = ["A1", "B1"];

const vol = new Tone.Volume(-12).toDestination();
const lpfilter = new Tone.Filter().connect(vol);
const feedbackDelay = new Tone.FeedbackDelay("12n", 0).connect(lpfilter);

let monosynth = new Tone.MonoSynth({
  oscillator: {
    type: "square",
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.9,
    release: 1,
  },
  filterEnvelope: {
    attack: 0.0,
    decay: 0.2,
    sustain: 0.5,
    release: 2,
    baseFrequency: 500,
    octaves: 2,
    exponent: 2,
  },
}).connect(feedbackDelay);
monosynth.volume.value = -4;

let kickSynth = new Tone.MembraneSynth({
  pitchDecay: 0.15,
  octaves: 5,
}).connect(feedbackDelay);
kickSynth.volume.value = -12;

const triggerKick = (a, b) => {
  kickSynth.triggerAttackRelease(a, b);
};

var noiseSynth = new Tone.NoiseSynth().connect(feedbackDelay);
noiseSynth.volume.value = -20;

const triggerNoize = () => {
  noiseSynth.triggerAttackRelease("8n");
};

const samples = new Tone.Sampler({
  urls: {
    A1: "/Loud/cymkik_b3staa.wav",
    B1: "/Loud/jaydeesnare_qc9dw5.wav",
    C1: "/Metal/cowbell_aihfsc.wav",
    D1: "/Metal/hih_gmxx95.wav",
    E1: "/Soft/conga_uvdi3n.wav",
    F1: "/Soft/snap_mtp0yq.wav",
    G1: "/Wood/kick_i1pqe6.wav",
    A2: "/Wood/clap_xmxx6f.wav",
  },
  baseUrl:
    "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds",
}).connect(feedbackDelay);

export default function PatternMakerComp(props) {
  const dispatch = useDispatch();

  const seqPattern = useSelector(selectSeqPattern);
  const seqSetting = useSelector(seqSettings);
  const [pattern, updatePattern] = useState(seqPattern.pattern); //INIT BY REDUX STATE

  // PATTERN UPDATER FROM SELECT
  useEffect(() => {
    updatePattern(seqPattern.pattern);
  }, [seqPattern.pattern]);

  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, col) => {
        pattern.map((row, noteIndex) => {
          if (row[col]) {
            samples.triggerAttackRelease(notes[noteIndex], "16n", time);
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "8n"
    ).start(0);
    return () => loop.dispose();
  }, [pattern]);

  // Update pattern by making a copy and inverting the value :S WHYYY??????
  function setPattern({ x, y, value }) {
    const patternCopy = [...pattern];
    patternCopy[y][x] = +!value;
    updatePattern(patternCopy);
  }

  switch (seqSetting.seqSoundSelected) {
    case "Loud":
      notes = ["B1", "A1"];
      break;
    case "Electronic":
      notes = ["D1", "C1"];
      break;
    case "Percussion":
      notes = ["F1", "E1"];
      break;
    case "Neo-Soul":
      notes = ["A2", "G1"];
      break;
    default:
      notes = ["E2", "G1"];
  }

  // keypressings
  window.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
        case "z":
          triggerKick("F2", "32n");
          break;
        case "x":
          triggerNoize();
          break;
        case "1":
          monosynth.triggerAttackRelease("C1", "32n");
          break;
        case "2":
          monosynth.triggerAttackRelease("D1", "32n");
          break;
        case "3":
          monosynth.triggerAttackRelease("F1", "32n");
          break;
        case "4":
          monosynth.triggerAttackRelease("G1", "32n");
          break;
        case "5":
          monosynth.triggerAttackRelease("A1", "32n");
          break;
        case "6":
          monosynth.triggerAttackRelease("C2", "32n");
          break;
        case "7":
          monosynth.triggerAttackRelease("D2", "32n");
          break;
        case "8":
          monosynth.triggerAttackRelease("G2", "32n");
          break;
        case "9":
          monosynth.triggerAttackRelease("A2", "32n");
          break;
        case "0":
          monosynth.triggerAttackRelease("A3", "32n");
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true
  );

  // SOUND EFFECTS
  useEffect(() => {
    vol.volume.value = seqSetting.seqSettingsvol;
  }, [seqSetting.seqSettingsvol]);

  useEffect(() => {
    feedbackDelay.wet.value = seqSetting.seqSettingsdel;
    feedbackDelay.feedback.value = seqSetting.seqSettingsdel;
  }, [seqSetting.seqSettingsdel]);

  useEffect(() => {
    lpfilter.frequency.value = seqSetting.seqSettingsfilter;
  }, [seqSetting.seqSettingsfilter]);

  return (
    <div className="Pattern-style">
      {/* <p>{(activeColumn + 1) / 2 + 0.5} </p> */}

      <div
        className="pattern-seqrows"
        style={{
          border: `1px solid ${seqPattern.color}`,
          background: "rgba(1,1,1,0.7)",
        }}
      >
        {seqPattern.pattern.map((row, y) => (
          <div key={y}>
            {row.map((value, x) => (
              <button
                key={x}
                style={
                  value === 1
                    ? {
                        background: `linear-gradient(to left, rgba(0,0,0,1), ${seqPattern.color})`,
                        border: seqPattern.color,
                      }
                    : {
                        background: "rgba(0,0,0,0.4)",
                        border: seqPattern.color,
                      }
                }
                onClick={() => {
                  setPattern({ x, y, value });
                  dispatch(PatternUpdater(pattern));
                }}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
