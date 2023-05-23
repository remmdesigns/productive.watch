const Stopwatch = (props) => {
    let buttonText

    if (props.running) {
        if (props.timerStage === 1 || props.timerStage === 2) {
            buttonText = 'Stop'
        } else if (props.timerStage === 3) {
            buttonText = 'Resume & cancel break'
        } else if (props.timerStage === 4) {
            buttonText = 'Begin next session'
        }        
    } else {        
        buttonText = 'Start'
    }

    const handleStopwatchButton = () => {
        if (props.timerStage === 1 || props.timerStage === 2) {
            props.handleRunning()
        } else if (props.timerStage === 3) {
            // They want to resume and cancel their break
            props.handleTimerStage(1)
            props.handleRunning(true)
        } else if (props.timerStage === 4) {
            // Begin next session
            props.handleTimerStage(1)
            props.handleRunning(true)
        } 
    }

    return (
        <section>
            <h2>Today's Stop Watch</h2>
            <div className='card'>
            <p className='card-text'>
                <span>{("" + Math.floor((props.stopwatch / 3600) % 60)).slice(-2)}</span>:
                <span>{("0" + Math.floor((props.stopwatch / 60) % 60)).slice(-2)}</span>'
                <span>{("0" + (props.stopwatch % 60)).slice(-2)}</span>
            </p>
            </div>
            <button onClick={handleStopwatchButton}>{buttonText}</button>
            <button onClick={() => props.handleReset()}>Reset</button>
        </section>
    )
}

export default Stopwatch