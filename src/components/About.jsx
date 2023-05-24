const About = () => {

    return (
        <section className="bg-mediumgrey padding-2121 margin-2000 padding-0040 flex justify-content-center line-height-1-15">
            <article className='container'>
                <h2>About Productive Watch</h2>
                <hr />
                <p className="padding-1000">This web app was created for people who like recording how long they <em>actually work</em> each day and want to use time management methods such as the Pomodoro technique to stay in the flow.</p>
                <p className="padding-0010">You can read more about the <a href='https://en.wikipedia.org/wiki/Pomodoro_Technique' className='black' target="_blank" rel="noopener noreferrer">Pomodoro technique</a> on Wikipedia.</p>
                <hr />
                <p className="padding-1000">We are working on some new features: </p>
                <ul>
                    <li>Storing and displaying your stats once you hit reset.</li>
                    <li className="padding-1000">Adjusting the timers to your liking (currently the pomodoro timer is 25 mins, the short break 5 mins and the long break 10mins)</li>
                </ul>
                <a href='https://github.com/remmdesigns/productive.watch' className='black' target="_blank" rel="noopener noreferrer">View this project's code on GitHub</a>
            </article>
        </section>
    )
}

export default About