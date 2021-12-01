import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Switch, Slider } from 'antd';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  },
];

function App() {
  const [bankToggle, setBankToggle] = useState(true);
  const [bank, setBank] = useState(bankOne);
  const [muteAudio, setMuteAudio] = useState(false);
  const [soundValue, setSoundValue] = useState(0.5);

  useEffect(() => {
    if (bankToggle) {
      setBank(bankOne);
    } else {
      setBank(bankTwo);
    }
  }, [bankToggle]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeys);
    return () => document.removeEventListener('keydown', handleKeys);
  });

  const buttonPressed = (e) => {
    e.preventDefault();
    const audio = e.target.children[0];
    const displayText = document.getElementById('display');

    if (!muteAudio) {
      e.target.classList.add('drum-pad-pressed');
      setTimeout(() => e.target.classList.remove('drum-pad-pressed'), 100);
      displayText.innerHTML = e.target.id;
      audio.currentTime = 0;
      audio.volume = soundValue;
      audio.play();
    }
  };

  const handleKeys = (e) => {
    const audio = document.getElementById(String.fromCharCode(e.keyCode));
    const displayText = document.getElementById('display');

    if (audio !== null && !muteAudio) {
      displayText.innerHTML = audio.parentElement.id;

      audio.parentElement.classList.add('drum-pad-pressed');
      setTimeout(
        () => audio.parentElement.classList.remove('drum-pad-pressed'),
        100
      );
      audio.currentTime = 0;
      audio.volume = soundValue;
      audio.play();
    }
  };

  useEffect(() => {
    const pad = document.querySelector('.drum-pad').childNodes[0];
    pad.volume = soundValue;
  }, [soundValue]);

  return (
    <div id="drum-machine">
      <div id="controls">
        <div className="switch control-item">
          <Switch
            checkedChildren="Power ON"
            unCheckedChildren="Power OFF"
            defaultChecked
            onClick={() => setMuteAudio(!muteAudio)}
            style={{ borderRadius: 0 }}
          />
        </div>

        <div className="slidecontainer control-item">
          <Slider
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={soundValue}
            className="slider"
            id="myRange"
            onChange={(value) => {
              setSoundValue(value);
              const temp = document.getElementById('display');
              temp.innerHTML = `Sound : ${Math.round(value * 100)}`;
            }}
            tooltipVisible={false}
          />
        </div>
        <div id="display" className="control-item">
          Let's Play
        </div>
        <div className="switch control-item">
          <Switch
            checkedChildren="Bank 1"
            unCheckedChildren="Bank 2"
            defaultChecked
            onClick={() => setBankToggle(!bankToggle)}
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>

      <div className="drum-area">
        <div className="pass-test">Let's Play</div>
        {bank.map(({ keyCode, keyTrigger, id, url }) => {
          return (
            <div className="drum-pad" id={id} onClick={buttonPressed} key={id}>
              <audio src={url} id={keyTrigger} className="clip" />
              {keyTrigger}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
