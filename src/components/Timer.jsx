const Timer = (props) => {

    return (
        <section>
            <h2>{props.timerStage < 3 ? 'Pomodoro' : 'Break'} Timer</h2>
            {props.pomodoroCount > 0 && <h3>{props.pomodoroCount} session{props.pomodoroCount > 1 && `'s`} complete!</h3>}
            <div className='card'>
                <p className='card-text'>
                <span>{("0" + Math.floor((props.timer / 60) % 60)).slice(-2)}</span>'
                <span>{("0" + (props.timer % 60)).slice(-2)}</span>
                </p>
            </div>
            {props.timerStage === 1 && <button onClick={() => props.handleTimerStage(1)}>Reset</button>}
            {props.timerStage === 2 && <>
                <button onClick={() => {
                    props.handleTimerStage(3)
                }
            }>You've earned a {(props.pomodoroCount / 4) % 1 === 0 ? '10' : '5'} minute break! Would you like to start it?</button>
            </>}
            {(props.timerStage > 1 && props.timerStage < 4) && <button onClick={() => {
                    props.handleTimerStage(1)
                    props.handleRunning(true)
                }
            }>Cancel and start another 25 minute session</button>}
            {props.timerStage === 4 && <button onClick={() => {
                    props.handleTimerStage(1)
                    props.handleRunning(true)
                }
            } >Your break is up. Press either green button to begin a new 25 minute session</button>}
        </section>
    )
}

export default Timer