const { count } = require("console");
const { TIMEOUT } = require("dns");
const { setTimeout } = require("timers");

// Residential Controller
let callbuttonID = 1
let elevatorID = 1
let floorRequestButtonID= 1

// Step 1: Initializing classes

// Column
class Column {
    constructor(_id,_status,_amountOfFloor,_amountOfElevator){ // Setting the base attributes we will need for this class
        console.log("number of floor: ", _amountOfFloor);
        this.id = _id;
        this.status = _status
        this.amountOfElevator = _amountOfElevator
        this.amountOfFloor = _amountOfFloor
        this.callButtonList = []
        this.elevatorList = []
        this.createCallButtons(); // Calling the functions to create the call buttons
        this.createElevators();   // as well as the elevators
        //console.log(this.callButtonList);
        //console.log(this.elevatorList);
        //this.findBestElevator();
    }
    createCallButtons(){
        let numberOfCallButtons = this.amountOfFloor
        let buttonFloor = 1
        for(let i = 0; i < numberOfCallButtons; i++){
            if(buttonFloor < this.amountOfFloor){
                let callButton = new CallButton(callbuttonID,"off",buttonFloor,"up") // The first floor will only have a Up button
                this.callButtonList.push(callButton);
                callbuttonID ++;
            } 
            if(buttonFloor > 1){
                let callButton = new CallButton(callbuttonID,"off",buttonFloor,"Down") // the last floor will only have a Down button
                this.callButtonList.push(callButton);
                callbuttonID ++;
            }
            buttonFloor ++;
        }
    }
    createElevators(){
        for(let i = 0; i < this.amountOfElevator; i++){
            let elevator = new Elevator(elevatorID,"idle",this.amountOfFloor,1,"up",this.amountOfElevator)
            this.elevatorList.push(elevator);
            elevatorID ++;
        }
    }
    requestElevator(requestedFloor,direction){
    }
    findElevator(requestedFloor,requestedDirection){
        let bestElevatorInfo = {
            bestElevator: null,
            bestScore: 5,
            referenceGap: Infinity
        }
        this.elevatorList.forEach(elevator => {
            if(requestedFloor == elevator.currentFloor && elevator.status == "idle" && requestedDirection == elevator.direction){
                bestElevatorInfo = this.checkElevator(1,elevator,bestElevatorInfo,requestedFloor)
            }
        });
        return bestElevatorInfo.bestElevator;
    }
    checkElevator(scoreTocheck,elevator,bestElevatorInfo,floor){
        if(scoreTocheck < bestElevatorInfo.bestScore){
            bestElevatorInfo.bestScore = scoreTocheck
            bestElevatorInfo.bestElevator = elevator
            bestElevatorInfo.referenceGap = Math.abs(elevator.currentFloor - floor)
        } 
        else if(bestElevatorInfo.bestScore == scoreTocheck){
            let gap = Math.abs(elevator.currentFloor - floor)
            if(bestElevatorInfo.referenceGap > gap){
                bestElevatorInfo.bestScore = scoreTocheck
                bestElevatorInfo.bestElevator = elevator
                bestElevatorInfo.referenceGap = gap
            }
        }
        return bestElevatorInfo;
    }
}

// Elelvator
class Elevator{
    constructor(_id,_status,_amountOfFloor,_currentFloor){
        this.id = _id
        this.status = _status
        this.amountOfFloor = _amountOfFloor
        this.direction = _direction
        this.currentFloor = _currentFloor
        this.door = new Doors(_id, "closed") 
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.createFloorRequestButtons();
        
        //console.log(this.floorRequestButtonList);
        console.log(this.door);
    }
    createFloorRequestButtons(){ // method that creates the floor request buttons for each instance of elevator
        let floorNumber = 1
        for(let i = 0; i < this.amountOfFloor; i++){
            let floorButton = new FloorRequestButton(floorRequestButtonID,"off",floorNumber)
            this.floorRequestButtonList.push(floorButton);
            floorNumber ++;
            floorRequestButtonID ++; 
        }
    }
    requestFloor(floor){
        this.floorRequestList.push(floor)
        this.sortFloorRequestList();
        this.move();
        this.openDoors(); // will have to come back to this
    }
    move(){  // This method will make the elevator move
        while(this.floorRequestList != []){
            let destination = this.floorRequestList[0]
            this.status = "moving"
            if(this.currentFloor < destination){
                this.direction = "up"
                while(this.currentFloor < destination){
                    this.currentFloor++;
                }
            }
            else if(this.currentFloor > destination){
                this.direction = "down"
                while(this.currentFloor > destination){
                    this.currentFloor--;
                }
            }
            this.status = "idle"
            this.floorRequestList.shift();
        }
    } // Will have to look this up
    sortFloorRequestList(){
        if(this.direction == "up"){
            this.floorRequestList.sort(function(a,b){return a-b});
        }
        else{
            this.floorRequestList.sort(function(a,b){return b-a});
        }
    }
    openDoors(){ // the door opening method
        this.door.status = "open" 
        this.door.status = "closed"
        //console.log(this.door.status);
    }
}




// Call Button
class CallButton{
    constructor(_id,_status,_floor,_direction){
        this.id = _id
        this.status = _status
        this.floor = _floor
        this.direction = _direction
    }
}



// Floor Request Button
class FloorRequestButton{
    constructor(_id,_status,_floor){
        this.id = _id
        this.status = _status
        this.floor = _floor
    }
}



// Doors
class Doors{
    constructor(_id,_status){
        this.id = _id
        this.status = _status
    }
}



// Scenarios
let  residentialColum = new Column(1,"online",10,2);
console.log(residentialColum.elevatorList)

// Scenario 1

//////////////// testing //////////////////////
//let testElevator = new Elevator(1,"idle",10,1,"stopped")
//testElevator.move(10,"up");
//console.log("elevator: ",testElevator.currentFloor, testElevator.status)
//testElevator.openDoors();


