import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>productive.watch<span>TM</span></h1>
        <p>Since 2023</p>
        <p><span>REMM</span>DESIGNS<span>TM</span></p>
      </header>
      <main>
        <section>
          <h2>Today's Stop Watch</h2>
          <p>0:00'00</p>
          <button>Start</button>
          <button>Reset</button>
        </section>
        <section>
          <h2>Pomodoro Timer</h2>
          <p>0:00'00</p>
          <button>Reset</button>
        </section>
        <section>
          <h2>Last seven entries</h2>
          <table>

          </table>
        </section>
      </main>
      <footer>
        <p>Designed and developed by</p>
        <p><span>REMM</span>DESIGNS<span>TM</span></p>
        <p>We are web development company and here to help you design and develop your websites and/or to design your app ideas.</p>
        <p>Learn more about us at:</p>
        <a href='www.remmdesigns.com' target='_blank'>www.remmdesigns.com</a>
      </footer>
    </>
  )
}

export default App
