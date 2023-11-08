import {useState} from 'react'
import './DisplayStyles.css'


//Function for calculating the plates needed for a barbell
 

function calculatePlatesNeeded(option:number, userBarbellWeight:number, desiredWeight:number) {
    let remainingWeight = 0;
    

    let barbellPlates:number[] = [];
    if (option === 0) {
        barbellPlates = [25, 20, 15, 10.0, 5.0, 2.5, 1.5, 1, 0.5];
    } else if (option === 1) {
        barbellPlates = [45.0, 35.0, 25.0, 10.0, 5.0, 2.5, 1, 0.75, 0.5, 0.25];
    }

    remainingWeight = desiredWeight - userBarbellWeight;

    // Credit to https://gist.github.com/tommyod for this algorithm

    /* This algorithm will determine the amount of plates that are needed to load the bar to the desired
     * weight. This will take into account the weight of the bar. */
    const plateCount = new Array(barbellPlates.length).fill(0);
    for (let i = 0; i < barbellPlates.length; i++) {
        const plate = barbellPlates[i];

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
    //These will be used for barbell, kilos or pounds, and desired weights
    const [weight,setWeight] = useState(0);

    const [barbellWeight, setBarbellWeight] = useState(45)

    const [system,swap] = useState(1);

    const imperial =  [45.0, 35.0, 25.0, 10.0, 5.0, 2.5, 1, 0.75, 0.5, 0.25];

    const met = [25, 20, 15, 10.0, 5.0, 2.5, 1.5, 1, 0.5];

    //Clear results
    let clear = ()=>{
        snapBack(calculatePlatesNeeded(1,0,0))
    }
    //make imperial or metric
    let handleSystem = () =>{
        if (system === 0){
            swap(1);

        }
        else{
            swap(0);
        }
        clear();
    }

    const [reality,snapBack] = useState([0]);

    //get results
    let calculate = () => {
        try{
            snapBack(calculatePlatesNeeded(system,barbellWeight,weight))
        }
        catch(e){
            alert(e)
        }
    }



    return (
        <view>
            <h1 className="title">Barbell Calculator</h1>

            <h2 className="title">https://github.com/DavidHellwig</h2>
            
            <div className="con2">

                <label className="text2">Metric</label>

            <input className="check" type="checkbox" onChange={handleSystem}>

                </input>

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

                    <hr></hr>
                    

            </div>
            
            <div className="list">

            <h2>Results</h2>

                <table className="table">

                <tr>
                    <th>
                        Plates({system === 1 ? "Pounds": "Kilograms"})
                    </th>
                    
                </tr>
                {system === 1 ? imperial.map((plate,index)=>
                <tr>
                {plate} : {system === 1 ? reality[index] : 0}
              </tr>): met.map((plate,index)=>
                <tr>
                {plate} : {system === 0 ? reality[index] : 0}
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
    )
}
export default Display;