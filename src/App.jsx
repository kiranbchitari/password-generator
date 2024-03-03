import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed)
      str += "0123456789";
    if (charAllowed)
      str += "!@#$%^&*(){}`";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyToClipBoard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <>
      <div className="box">
        <div>
          <h4 className='text-center text-white'>Password Generator</h4>
          <div className="passwordArea">
            <input
              className='password'
              type="text"
              value={password}
              placeholder='Password...'
              readOnly
              ref={passwordRef} />
            <button className='copy' onClick={() => copyToClipBoard()} style={{ backgroundColor: 'blue' }}>Copy</button>
          </div>
          <div className="filter">
            <input className='item' type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => { setLength(e.target.value) }
              }
            /><label style={{marginRight:'12px'}}>Length: {length}</label>
            <input className='item' type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            /><label>Number</label>
            <input className='item' type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => { setCharAllowed((prev) => !prev) }}
            /><label>Character</label>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
