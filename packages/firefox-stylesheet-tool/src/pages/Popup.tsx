import { useEffect } from 'react';
import "./Popup.css";

export default function() {
  useEffect(() => {
    
    console.log("Hello from the popup!");

  }, []);

  return (
    <div>
      <img src="/icon-with-shadow.svg" />
      <h1>Stylesheet Tool</h1>
      <p>
        Template: <code>react-ts</code>
      </p>
    </div>
  )
}
