import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Stopwatch from './components/Stopwatch'
import Timer from './components/Timer'
import History from './components/History'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const pomodoro = 1500000
  const shortBreak = 300000
  const longBreak = 600000
  let timeNow = new Date()

  const [stopwatch, setStopwatch] = useState(0)
  const [running, setRunning] = useState(false)

  const [timer, setTimer] = useState(pomodoro)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [timerStage, setTimerStage] = useState(1)

  // const [previousEntries, setPreviousEntries] = useState(() => JSON.parse(localStorage.getItem("history") ?? '[]'))
  const [stopwatchArray, setStopwatchArray] = useState(() => JSON.parse(localStorage.getItem("stopwatchArray") ?? '[]'))
  const [timerArray, setTimerArray] = useState(() => JSON.parse(localStorage.getItem("timerArray") ?? '[]'))

  const resetStopwatchArray = () => {
    setStopwatchArray([])
    localStorage.setItem("stopwatchArray", JSON.stringify(stopwatchArray))
  }

  const resetTimerArray = () => {
    setTimerArray([])
    localStorage.setItem("timerArray", JSON.stringify(timerArray))
  }

  const updateLocally = (clock) => {
    if (clock === 'stopwatch') {
      const lastItem = stopwatchArray.pop()
      stopwatchArray.push({...lastItem, end: timeNow })
      localStorage.setItem("stopwatchArray", JSON.stringify(stopwatchArray))

    } else if (clock === 'timer') {
      const lastItem = timerArray.pop()
      timerArray.push({...lastItem, end: timeNow })
      localStorage.setItem("timerArray", JSON.stringify(timerArray))

    } else {
      return
    }
  }

  useEffect(() => {
    console.log(` ___ ___ __  __ __  __ 
| _ \\ __|  \\/  |  \\/  |
|   / _|| |\\/| | |\\/| |
|_|_\\___|_|  |_|_|  |_|

Designed and developed by REMMDESIGNS©
Visit www.remmdesigns.com to learn more.`)

    if (!running) {
      resetStopwatchArray()
      resetTimerArray()
    }
  }, [])

  useEffect(() => {
    if (running && timerStage < 3) {

      const stopwatchId = setInterval(() => {
        timeNow = new Date()

        setStopwatch(() => {
          let total = 0
          if (stopwatchArray.length > 1) {
            for (let i = 0; i < stopwatchArray.length -1; i++) {
              total += stopwatchArray[i].end -stopwatchArray[i].start
            }
          }
          total += timeNow - stopwatchArray.at(-1).start
          return total
        })
      }, 1000)    
  
      return () => {
        clearInterval(stopwatchId)        
      }
    } 
    
  })

  useEffect(() => {
    if ((running || timerStage === 3) && timer > 0) {

      const timerId = setInterval(() => {
        timeNow = new Date()

        setTimer(() => {
          if (timerStage === 1) {
            let total = 0
            if (timerArray.length > 1) {
              for (let i = 0; i < timerArray.length -1; i++) {
                total += timerArray[i].end -timerArray[i].start
              }
            }
            total += timeNow - timerArray.at(-1).start
            return pomodoro - total
          }
          if (timerStage === 3) {
            let total = 0

            if (timerArray.length > 1) {
              for (let i = 0; i < timerArray.length -1; i++) {
                total += timerArray[i].end -timerArray[i].start
              }
            }
            total += timeNow - timerArray.at(-1).start
            return ((pomodoroCount / 4) % 1 === 0 ? longBreak : shortBreak) - total
          }
        })
      }, 1000)
  
      return () => {
        clearInterval(timerId)
      }
    }    
  })

  useEffect(() => {
    if (timer <= 0) {
      updateLocally('timer')

      const audio = new Audio('announcement.mp3')
      audio.play()
    }

    if (timer <= 0 && timerStage === 1) {     
      setPomodoroCount(prevState => prevState + 1)
      setTimerStage(2)
    } 

    if (timer <= 0 && timerStage === 3) {
      setTimerStage(4)
    } 

  }, [timer])

  useEffect(() => {
    if (running) {
      stopwatchArray.push({ start: timeNow })
      localStorage.setItem("stopwatchArray", JSON.stringify(stopwatchArray))

    } else if (!running) {
      // need this so when someone resets the stopwatch when still running it doesn't bug out
      if (stopwatchArray.length === 0 ) {
        return 

      } else {
        updateLocally('stopwatch')

      }      
    }
  }, [running])


  useEffect(() => {
    if ((running || timerStage === 3) && timer > 0) {
      timerArray.push({ start: timeNow })
      localStorage.setItem("timerArray", JSON.stringify(timerArray))

    } else if (!running) {

      if (timerArray.length === 0 ) {
        return 

      } else {
        updateLocally('timer')

      }      
    }
  }, [running, timerStage])

  const handleRunning = (boolean) => {
    if (boolean === 'true') {
      setRunning(true)
    } else if (boolean === 'false') {
      setRunning(false)
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
    resetStopwatchArray()
    resetTimerArray()

    setRunning(false)
    setStopwatch(0)
    setTimer(pomodoro)
    setPomodoroCount(0)
    setTimerStage(1)
  }

  const handleTimerStage = (stage) => {
    // 1: Working, 2: Work session has ended, 3: On break, 4: Break has ended
    resetTimerArray()

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