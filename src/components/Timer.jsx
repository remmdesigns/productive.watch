const Timer = (props) => {

    return (
        <section className='flex flex-direction-column margin-2000 '>
            <h2 className='text-align-center'>{props.timerStage < 3 ? 'Pomodoro' : 'Break'} Timer</h2>
            {props.pomodoroCount > 0 && <h3 className='text-align-center bold remm-green margin-0'>{props.pomodoroCount} session{props.pomodoroCount > 1 && `'s`} complete!</h3>}
            <div className='text-align-center'>
                <p className='clock extra-large-font'>
                <span>{props.timer > 0 ? ("0" + Math.floor((props.timer / 60000) % 60)).slice(-2): '00'}</span>'
                <span>{props.timer > 0 ? ("0" + Math.ceil((props.timer / 1000) % 60)).slice(-2): '00'}</span>
                </p>
            </div>
            {/* {props.timerStage === 1 && <button className='' onClick={() => props.handleTimerStage(1)}>Reset</button>} */}
            {props.timerStage === 2 && <>
                <button className='primary-button margin-0010' onClick={() => {
                    props.handleTimerStage(3)
                    props.handleRunning('false')
                }
            }>You've earned a {(props.pomodoroCount / 4) % 1 === 0 ? '10' : '5'} minute break! Would you like to start it?</button>
            </>}
            {(props.timerStage > 1 && props.timerStage < 4) && <button onClick={() => {
                    props.handleTimerStage(1)
                    props.handleRunning('true')
                }
            }>Cancel and start another 25 minute session</button>}
            {props.timerStage === 4 && <button className='primary-button' onClick={() => {
                    props.handleTimerStage(1)
                    props.handleRunning('true')
                }
            } >Your break is up. Press either green button to begin a new 25 minute session</button>}
        </section>
    )
}

export default Timer