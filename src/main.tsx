import React from 'react'
// import ReactDOM from 'react-dom'

// ReactDOM.createRoot(document.getElementById('root')!).render(
  //   <React.StrictMode>
  //   </React.StrictMode>,
  // )


import App from './App.tsx'
import { createRoot } from 'react-dom/client';


const domNode = document.getElementById('root');
if(domNode){

  const root = createRoot(domNode);
  root.render(<App />)

}

