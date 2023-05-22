import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
  // https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers

  const start = 0 //(3600*10-10)
  const pomodoro = 5

  const [stopwatch, setStopWatch] = useState(start)
  const [running, setRunning] = useState(false)
  const [timer, setTimer] = useState(pomodoro)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [isOnBreak, setIsOnBreak] = useState(false)
  const [breakMessage, setBreakMessage] = useState(false)

  useEffect(() => {
    if (running) {
      // Stopwatch's total
      // console.log(stopwatch)
      // How many seconds - total remainder 60 to get the second
      // console.log(("0" + (stopwatch % 60)).slice(-2))
      // How many minutes - Returns the greatest total less than or equal to 60 (one minute) then use the remainder of 60 to get the minute
      // console.log(("0" + Math.floor((stopwatch / 60) % 60)).slice(-2))
      // How many hours - Returns the greatest total less than or equal to 3600 (one hour) then use the remainder of 60 to get the hour
      // console.log(("0" + Math.floor((stopwatch / 3600) % 60)).slice(-2))
      // Pomodoro Timer
      // console.log(timer)

      const stopwatchId = setInterval(() => {
        setStopWatch(prevState => prevState + 1)
      }, 1000)    
  
      return () => {
        clearInterval(stopwatchId)
        
      }
    }    
  })

  useEffect(() => {
    if (running && timer > 0) {
      // console.log(timer)

      const timerId = setInterval(() => {
        setTimer(prevState => prevState - 1)
      }, 1000)
  
      return () => {
        clearInterval(timerId)
      }
    }    
  })

  useEffect(() => {
      if (timer === 0 && !isOnBreak) {
        setPomodoroCount(prevState => prevState + 1)
        setBreakMessage(true)
      } 
  }, [timer])

  const handleSetTimer = (time) => {
    setTimer(time)
  }

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
          <div className='card'>
            <p className='card-text'>
              <span>{("" + Math.floor((stopwatch / 3600) % 60)).slice(-2)}</span>:
              <span>{("0" + Math.floor((stopwatch / 60) % 60)).slice(-2)}</span>'
              <span>{("0" + (stopwatch % 60)).slice(-2)}</span>
            </p>
          </div>
          <button onClick={() => setRunning(running => !running)}>Start / Stop</button>
          <button onClick={() => {
              setRunning(false)
              setStopWatch(start)
              setTimer(pomodoro)
              setPomodoroCount(0)
              setBreakMessage(false)
              setIsOnBreak(false)
            }
          }>Reset</button>
        </section>
        <section>
          <h2>Pomodoro Timer</h2>
          {pomodoroCount > 0 && <h3>{pomodoroCount} session{pomodoroCount > 1 && `'s`} complete!</h3>}
          <div className='card'>
            <p className='card-text'>
              <span>{("0" + Math.floor((timer / 60) % 60)).slice(-2)}</span>'
              <span>{("0" + (timer % 60)).slice(-2)}</span>
            </p>
          </div>
          {!isOnBreak && timer > 0 && <button onClick={() =>setTimer(pomodoro)}>Reset</button>}
          {breakMessage && <>
            <button onClick={() => {
                setTimer(300)
                setIsOnBreak(true)
              }              
            }>You've earned a 5 minute break! Would you like to start it?</button>
            <button onClick={() =>setTimer(pomodoro)}>Cancel and start another 25 minute session</button>
          </>}
          {isOnBreak &&  <button>Pause break</button>}
        </section>
        {/* <section>
          <h2>Last seven entries</h2>
          <table>

          </table>
        </section> */}
      </main>
      {/* <footer>
        <p>Designed and developed by</p>
        <p><span>REMM</span>DESIGNS<span>TM</span></p>
        <p>We are web development company and here to help you design and develop your websites and/or to design your app ideas.</p>
        <p>Learn more about us at:</p>
        <a href='www.remmdesigns.com' target='_blank'>www.remmdesigns.com</a>
      </footer> */}
    </>
  )
}

export default App
