import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import fileSaver from 'file-saver';
import './App.css'

function App() {
  // From
  // https://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer
  function toArrayBuffer(buffer: any) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return arrayBuffer;
  }

  function createXlsx() {
    fetch('/api/xlsx', {
      method: 'POST'
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        const bufferData = toArrayBuffer(json.data)
        var blob = new Blob([bufferData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        fileSaver.saveAs(blob, 'template-new.xlsx')
      });
  }

  return (
    <div className="App">
      <button onClick={() => {createXlsx()}}>
        Create xlsx template
      </button>
    </div>
  )
}

export default App
