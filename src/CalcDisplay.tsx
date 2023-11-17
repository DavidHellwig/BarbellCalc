import {useState,useEffect} from 'react'
import './DisplayStyles.css'


//Function for calculating the plates needed for a barbell
 

function calculatePlatesNeeded(option:number[], userBarbellWeight:number, desiredWeight:number) {
    let remainingWeight = 0;

    remainingWeight = desiredWeight - userBarbellWeight;

    // Credit to https://gist.github.com/tommyod for this algorithm

    /* This algorithm will determine the amount of plates that are needed to load the bar to the desired
     * weight. This will take into account the weight of the bar. */
    const plateCount = new Array(option.length).fill(0);
    for (let i = 0; i < option.length; i++) {
        const plate = option[i];

        if (plate * 2 <= remainingWeight) {
            const multiplier = Math.floor(remainingWeight / plate);
            if (multiplier % 2 === 0) {
                plateCount[i] = (multiplier) / 2;
                remainingWeight -= multiplier * plate;
            } else if (multiplier % 2 > 0) {
                plateCount[i] = (multiplier - 1) / 2;
                remainingWeight -= (multiplier - 1) * plate;
            }
        }
    }

    if (remainingWeight > 0) {
        throw new Error("Impossible to reach given weight.");
    }
    return plateCount;
    

}


function Display(){
    //These states will be used for barbell, kilos or pounds,desired weights and theme
    const imperial =  [45.0, 35.0, 25.0, 10.0, 5.0, 2.5, 1, 0.75, 0.5, 0.25];

    const imperialNoThirtyFives = [45.0, 25.0, 10.0, 5.0, 2.5, 1, 0.75, 0.5, 0.25];

    const met = [25, 20, 15, 10.0, 5.0, 2.5, 1.5, 1, 0.5];

    const [weight,setWeight] = useState(0);

    const [barbellWeight, setBarbellWeight] = useState(45);

    const [system,swapSystem] = useState(imperial);

    const[stringSystem,swap] = useState("")

    const [isDay, changeTheme] = useState(true);

    //switches the theme
    let toggleTheme = () => {
        changeTheme(!isDay);

    }


    //Clears results so that old results are not present when switching measurement systems
    let clear = ()=>{
        updateActualPlatesNeeded(calculatePlatesNeeded(system,0,0))
    }

    
    //Changes the measurement system 
    useEffect(() => {
        
        switch (stringSystem) {
          case 'imperial':
            swapSystem(imperial);
            
            break;
          case 'met':
            swapSystem(met);
            
            break;
          case 'imperialNoThirtyFives':
            swapSystem(imperialNoThirtyFives);
            
            break;
          default:
            break;
        }
        clear();
      }, [stringSystem]);

    const [actualPlatesNeeded,updateActualPlatesNeeded] = useState(imperial);

    //get results
    let calculate = () => {
        try{
            updateActualPlatesNeeded(calculatePlatesNeeded(system,barbellWeight,weight))
        }
        catch(e){
            alert(e)
        }
    }



    return (
        <div  className={isDay ? "day":"night"}>
        <view>
            <h1 className="title">Barbell Calculator</h1>

            <h2 className="title">https://github.com/DavidHellwig</h2>
            
            <div className="con2">

                
                <label className="text2">Measurement System</label>
                <select className="check" value={stringSystem} onChange={(e)=>swap(e.target.value)}>
                        
                        <option value="imperial">Imperial</option>

                        <option value="met">Metric</option>

                        <option value="imperialNoThirtyFives">Imperial (No 35s)</option>
                </select>

                <label>

                    Barbell Weight:

                    </label>

                <input className="box" type="number" placeholder='0' onChange={(e) => setBarbellWeight(parseFloat(e.target.value))}>

                </input>
                
                <label>

                    Lifting Weight:

                    </label>

                    <input className="box" type="number" placeholder='0'  onChange={(e) => setWeight(parseFloat(e.target.value))}>

                    </input>
                    
                    <button className="box" onClick={calculate}>Calculate</button>

                    <button onClick={toggleTheme}>
                    {isDay ? 'Light Mode' : 'Dark Mode'}
                </button>

                    <hr></hr>
                    

            </div>
            
            <div className="list">

            <h2>Results</h2>

                <table className="table">

                <tr>
                    <th>
                        Plates({stringSystem === "met" ? "Kilograms": "Pounds"})
                    </th>
                    
                </tr>
                {system.map((plate,index)=>
                <tr>
                {plate} : {actualPlatesNeeded[index]}
              </tr>)}
                
              
                </table>
                
            </div>
            <div className="container">
                
                <h4>Questions and Answers</h4>
                <p className="text">Q:Does this calculator show total plates needed or plates per side?</p>

                <p className="text">A: This one shows you the amount of plates you need on each side. For example, for 135 in pounds, it says you need one "45". </p>

                <p className="text">Q: What algorithm is used for this calculator?</p>

                <p className="text">A: It's a greedy algorithm modified from one <a href="https://gist.github.com/tommyod">https://gist.github.com/tommyod</a> used in an example. Specifically, here <a href="https://gist.github.com/tommyod/bdd13a83d3577634b91b79b1c00bce14">https://gist.github.com/tommyod/bdd13a83d3577634b91b79b1c00bce14 </a></p>

            </div>
            
        </view>
        </div>
    )
}
export default Display;