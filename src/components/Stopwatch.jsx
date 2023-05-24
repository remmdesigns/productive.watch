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
        <section className='flex flex-direction-column '>
            <h2 className='text-align-center'>Today's Stop Watch</h2>
            <div className='text-align-center'>
                <p className='clock extra-large-font'>
                    <span>{("" + Math.floor((props.stopwatch / 3600) % 60)).slice(-2)}</span>:
                    <span>{("0" + Math.floor((props.stopwatch / 60) % 60)).slice(-2)}</span>'
                    <span>{("0" + (props.stopwatch % 60)).slice(-2)}</span>
                </p>
            </div>
            <div className="grid-3-1--1">
                <button className='primary-button' onClick={handleStopwatchButton}>{buttonText}</button>
                <button onClick={() => props.handleReset()}>Reset</button>  
            </div>
            
        </section>
    )
}

export default Stopwatch