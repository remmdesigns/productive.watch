import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Stopwatch from './components/Stopwatch'
import Timer from './components/Timer'
import History from './components/History'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const start = 0 //3601000 //(3600*10-10)
  const pomodoro = 10000//1500000
  const shortBreak = 10000//300000
  const longBreak = 20000 //600000

  const [stopwatch, setStopwatch] = useState(start)
  const [running, setRunning] = useState(false)

  const [timer, setTimer] = useState(pomodoro)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [timerStage, setTimerStage] = useState(1)

  // const [previousEntries, setPreviousEntries] = useState(() => JSON.parse(localStorage.getItem("history") ?? '[]'))
  const [stopwatchArray, setStopwatchArray] = useState(() => JSON.parse(localStorage.getItem("stopwatchArray") ?? '[]'))
  const [timerArray, setTimerArray] = useState(() => JSON.parse(localStorage.getItem("timerArray") ?? '[]'))

  useEffect(() => {
    console.log(` ___ ___ __  __ __  __ 
| _ \\ __|  \\/  |  \\/  |
|   / _|| |\\/| | |\\/| |
|_|_\\___|_|  |_|_|  |_|

Designed and developed by REMMDESIGNS©
Visit www.remmdesigns.com to learn more.`)
  }, [])

  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("stopwatchArray") ?? '[]'))

    if (running && timerStage < 3) {

      const stopwatchId = setInterval(() => {
        const currentTime = new Date()

        setStopwatch(() => {
          let total = 0
          if (stopwatchArray.length > 1) {
            for (let i = 0; i < stopwatchArray.length -1; i++) {
              total += stopwatchArray[i].end -stopwatchArray[i].start
            }
          }
          total += currentTime - stopwatchArray.at(-1).start
          return total
        })

        // console.log(stopwatch)
        // console.log(("0" + Math.floor((stopwatch / 1000) % 60)).slice(-2))
        // console.log(("0" + Math.floor((stopwatch / 60000) % 60)).slice(-2))
        // console.log(("" + Math.floor((stopwatch / 3600000) % 60)))

      }, 1000)    
  
      return () => {
        clearInterval(stopwatchId)        
      }
    }    
  })

  useEffect(() => {
    if ((running || timerStage === 3) && timer > 0) {

      const timerId = setInterval(() => {
        // setTimer(prevState => prevState - 1)
        const currentTime = new Date()

        setTimer(() => {

          if (timerStage === 1) {
            let total = 0
            if (timerArray.length > 1) {
              for (let i = 0; i < timerArray.length -1; i++) {
                total += timerArray[i].end -timerArray[i].start
              }
            }
            total += currentTime - timerArray.at(-1).start
            return pomodoro - total
          }
          if (timerStage === 3) {
            let total = 0

            if (timerArray.length > 1) {
              for (let i = 0; i < timerArray.length -1; i++) {
                total += timerArray[i].end -timerArray[i].start
              }
            }
            total += currentTime - timerArray.at(-1).start
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
      const currentTime = new Date()
      const lastItem = timerArray.pop()
      timerArray.push({...lastItem, end: currentTime })
      localStorage.setItem("timerArray", JSON.stringify(timerArray))

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
    const currentTime = new Date()

    if (running) {

      stopwatchArray.push({ start: currentTime })
      localStorage.setItem("stopwatchArray", JSON.stringify(stopwatchArray))

    } else if (!running) {
      // need this so when someone resets the stopwatch when still running it doesn't bug out
      if (stopwatchArray.length === 0 ) {

        return 

      } else {

        const lastItem = stopwatchArray.pop()
        stopwatchArray.push({...lastItem, end: currentTime })
        localStorage.setItem("stopwatchArray", JSON.stringify(stopwatchArray))

      }      
    }

  }, [running])


  useEffect(() => {
    const currentTime = new Date()

    if ((running || timerStage === 3) && timer > 0) {

      timerArray.push({ start: currentTime })
      localStorage.setItem("timerArray", JSON.stringify(timerArray))

    } else if (!running) {
      // need this so when someone resets the stopwatch when still running it doesn't bug out
      if (timerArray.length === 0 ) {

        return 

      } else {

        const lastItem = timerArray.pop()
        timerArray.push({...lastItem, end: currentTime })
        localStorage.setItem("timerArray", JSON.stringify(timerArray))

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
    setStopwatchArray([])
    localStorage.setItem("stopwatchArray", JSON.stringify(stopwatchArray))
    setTimerArray([])
    localStorage.setItem("timerArray", JSON.stringify(timerArray))

    setRunning(false)
    setStopwatch(start)
    setTimer(pomodoro)
    setPomodoroCount(0)
    setTimerStage(1)
    
  }

  const handleTimerStage = (stage) => {
    // 1: Working, 2: Work session has ended, 3: On break, 4: Break has ended
   
    setTimerArray([])
    localStorage.setItem("timerArray", JSON.stringify(timerArray))

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
