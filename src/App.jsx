import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Stopwatch from './components/Stopwatch'
import Timer from './components/Timer'
import History from './components/History'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const start = 0 //(3600*10-10)
  const pomodoro = 1500
  const shortBreak = 300
  const longBreak = 600

  const [stopwatch, setStopWatch] = useState(start)
  const [running, setRunning] = useState(false)

  const [timer, setTimer] = useState(pomodoro)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [timerStage, setTimerStage] = useState(1)

  const [previousEntries, setPreviousEntries] = useState(() => JSON.parse(localStorage.getItem("history") ?? '[]'))

  useEffect(() => {
    if (running && timerStage < 3) {
      // console.log(stopwatch)
      // How many seconds - total remainder 60 to get the second
      // console.log(("0" + (stopwatch % 60)).slice(-2))
      // How many minutes - Returns the greatest total less than or equal to 60 (one minute) then use the remainder of 60 to get the minute
      // console.log(("0" + Math.floor((stopwatch / 60) % 60)).slice(-2))
      // How many hours - Returns the greatest total less than or equal to 3600 (one hour) then use the remainder of 60 to get the hour
      // console.log(("0" + Math.floor((stopwatch / 3600) % 60)).slice(-2))

      const stopwatchId = setInterval(() => {
        setStopWatch(prevState => prevState + 1)
      }, 1000)    
  
      return () => {
        clearInterval(stopwatchId)        
      }
    }    
  })

  useEffect(() => {
    if ((running || timerStage === 3) && timer > 0) {
      // console.log(timer)

      const timerId = setInterval(() => {
        setTimer(prevState => prevState - 1)
      }, 1000)
  
      return () => {
        clearInterval(timerId)
      }
    }    
  })

  // Tried to get the timer to loop 3 times but couldn't get it to work
  // Don't work since the sound does not show up on the build folder.
  useEffect(() => {
    if (timer === 0) {
      const audio = new Audio('announcement.mp3')
      audio.play()
    } 
  }, [timer])

  useEffect(() => {
      if (timer === 0 && timerStage === 1) {
        setPomodoroCount(prevState => prevState + 1)
        setTimerStage(2)
      } 
  }, [timer])

  useEffect(() => {
    if (timer === 0 && timerStage === 3) {
      setTimerStage(4)
    } 
  }, [timer])

  useEffect(() => {
    console.log(` ___ ___ __  __ __  __ 
| _ \\ __|  \\/  |  \\/  |
|   / _|| |\\/| | |\\/| |
|_|_\\___|_|  |_|_|  |_|

Designed and developed by REMMDESIGNS©
Visit www.remmdesigns.com to learn more.`)
  }, [])

  const handleRunning = (boolean) => {
    if (boolean) {
      setRunning(boolean)
    } else{
      setRunning(running => !running)
    }
  }

  const handleReset = () => {
    // Record session...
    // previousEntries.push({
    //   date: new Date(),
    //   stopwatch,
    //   pomodoroCount
    // })
    // localStorage.setItem("history", JSON.stringify(previousEntries))

    setRunning(false)
    setStopWatch(start)
    setTimer(pomodoro)
    setPomodoroCount(0)
    setTimerStage(1)
  }

  const handleTimerStage = (stage) => {
    // 1: Working, 2: Work session has ended, 3: On break, 4: Break has ended

    if(stage === 1) {
      setTimer(pomodoro)
    } 
    if (stage === 3) {
      if ((pomodoroCount / 4) % 1 === 0) {
        setTimer(longBreak)
      } else {
        setTimer(shortBreak)
      }
    }

    setTimerStage(stage)
  }

  return (
    <>
      <Header />
      <main>
        <div className='padding-1111 flex justify-content-center'>
          <div className='container'>
            <Stopwatch 
              stopwatch={stopwatch} 
              running={running}
              timerStage={timerStage}
              handleRunning={handleRunning} 
              handleReset={handleReset}
              handleTimerStage={handleTimerStage}
            />
            <Timer 
              timer={timer}
              pomodoroCount={pomodoroCount}
              timerStage={timerStage}
              handleTimerStage={handleTimerStage}
              handleRunning={handleRunning} 
            />
            {/* <History /> */}          
          </div>
        </div>
        <About />
      </main>
      <Footer />
    </>
  )
}

export default App
