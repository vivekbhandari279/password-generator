import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLen, setPasswordLen] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialAllowed, setSpecialAllowed] = useState(false);

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    const charCombination = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numberCombination = "0123456789";
    const specialCharCombination = "!@#$%^&(){}";
    let password = "";
    let str = charCombination;
    if (numberAllowed && specialAllowed) {
      str = `${str}${numberCombination}${specialCharCombination}`;
    } else if (numberAllowed) {
      str = `${str}${numberCombination}`;
    } else if (specialAllowed) {
      str = `${str}${specialCharCombination}`;
    }

    for (let i = 0; i < passwordLen; i++) {
      const rendomIndex = Math.floor(Math.random() * str.length);
      password += str[rendomIndex];
    }
    setPassword(password);
  }, [passwordLen, numberAllowed, specialAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordLen, numberAllowed, specialAllowed]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div
      className="w-full items-center space-x-2 p-5 bg-gray-300"
      style={{ borderWidth: 1, borderColor: "black" }}
    >
      <h2>Password Generator</h2>
      <div className="flex gap-1">
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
          type="text"
          placeholder=""
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          readOnly
          ref={passwordRef}
        />
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="mt-2 flex gap-2 ">
        <input
          type="range"
          min={6}
          max={100}
          value={passwordLen}
          onChange={(event) => {
            setPasswordLen(event.target.value);
          }}
        />
        <span>({passwordLen < 10 ? `0${passwordLen}` : passwordLen})</span>

        <div>
          <span>Number</span>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => {
              setNumberAllowed((numberAllowed) => !numberAllowed);
            }}
          />
        </div>
        <div>
          <span>Special</span>
          <input
            type="checkbox"
            checked={specialAllowed}
            onChange={() => {
              setSpecialAllowed((specialAllowed) => !specialAllowed);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
