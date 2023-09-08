import React from 'react'
import {useState , useEffect} from 'react'

function App() {

  const [initialHours, setInitialHours] = useState(0); 
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  

    const [hours , setHours] = useState(0)
    const [minutes , setMinutes] = useState(0)
    const [seconds , setSeconds] = useState(0)
    const [isRunning , setIsRunning] = useState(false)

    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    useEffect(() => {
      let intervalId;
  
      if (isRunning && totalSeconds >= 0) {
        intervalId = setInterval(() => {
          if (seconds === 0 && minutes > 0) {
            setMinutes(minutes-1);
            setSeconds(59);
          }
          else if (seconds === 0 && minutes === 0) {
            setMinutes(59);
            setSeconds(59);
          }
          else if (totalSeconds > 0) {
            setHours(Math.floor(totalSeconds / 3600));
            setMinutes(Math.floor((totalSeconds % 3600) / 60));
            setSeconds(totalSeconds % 60 - 1);
          } else {
            setIsRunning(false);
            clearInterval(intervalId);
          }
        }, 1000);
      } else if (!isRunning || totalSeconds <= 0) {
        clearInterval(intervalId);
      }
  
      return () => clearInterval(intervalId);
    }, [isRunning, totalSeconds]);
  
    const formatValue = (value)=> {
      return (value < 10 ? `0${value}` : value)
    }  

    const handleStart = ()=> {
      setInitialHours(hours); // Use initial values to reset timer
      setInitialMinutes(minutes);
      setInitialSeconds(seconds);
      setIsRunning(true)
  }

  const handleStop = ()=> {
        setIsRunning(false)
  }

  const handleReset = ()=> {
      setHours(0)
      setMinutes(0)
      setSeconds(0)
  }

  const handleRestart = ()=> {
    setHours(initialHours); 
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsRunning(false);

  }

  return(
    <>
    <div className='app'>

      <div className='inputs'>
        <div className='in'>
         <h6>Hours</h6>
         <div className='ic'>
        <input type="number" min="0" max="99" value={formatValue(hours)} onChange={(e)=> setHours(parseInt(e.target.value , 10))}  onKeyDown={(e) => e.preventDefault()}/> <p>:</p>
        </div>
        </div>
        <div className='in'>  
        <h6>Minutes</h6>
        <div className='ic'>
        <input type="number" min="0" max="59" value={formatValue(minutes)} onChange={(e)=> setMinutes(parseInt(e.target.value , 10))}  onKeyDown={(e) => e.preventDefault()}/> <p>:</p>
       </div>
       </div>
       <div className='in'>        
        <h6>Seconds</h6>
        <div className='ic'>
        <input type="number" min="0" max="59" value={formatValue(seconds)} onChange={(e)=> setSeconds(parseInt(e.target.value , 10))}  onKeyDown={(e) => e.preventDefault()}/>
    </div>
    </div>
  </div>

      <div className='buttons'>    
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleRestart}>Restart</button>
      <button onClick={handleReset}>Reset</button>
      </div>
    </div>
    </>
 )
}

export default App;
