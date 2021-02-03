// Residential Controller
let callbuttonID = 1
let elevatorID = 1
let floorRequestButtonID= 1

// Step 1: Initializing classes

// Column
class Column {
    constructor(_id,_status,_amountOfFloor,_amountOfElevator){ // Setting the base attributes we will need for this class
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
            let elevator = new Elevator(elevatorID,"idle",this.amountOfFloor,1)
            this.elevatorList.push(elevator);
            elevatorID ++;
        }
    }
    requestElevator(requestedFloor,direction){
        let elevator = this.findElevator(requestedFloor,direction);
        elevator.floorRequestList.push(requestedFloor);
        elevator.move();
        elevator.openDoors();
        return elevator;
    }
    findElevator(requestedFloor,requestedDirection){
        let bestElevatorInfo = {
            bestElevator: null,
            bestScore: 5,
            referenceGap: Infinity
        }
        this.elevatorList.forEach(elevator => {
            if(requestedFloor == elevator.currentFloor && elevator.status == "idle" && requestedDirection == elevator.direction){
                bestElevatorInfo = this.checkElevator(1, elevator, bestElevatorInfo, requestedFloor)
            }
            else if(requestedFloor > elevator.currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction){
                bestElevatorInfo = this.checkElevator(2, elevator, bestElevatorInfo, requestedFloor)
            }
            else if(requestedFloor < elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction){
                bestElevatorInfo = this.checkElevator(2, elevator, bestElevatorInfo, requestedFloor)
            }
            else if(elevator.status == "idle"){
                bestElevatorInfo = this.checkElevator(3, elevator, bestElevatorInfo, requestedFloor)
            }
            else{
                bestElevatorInfo = this.checkElevator(4, elevator, bestElevatorInfo, requestedFloor)
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
        this.direction = null
        this.currentFloor = _currentFloor
        this.door = new Doors(_id, "closed") 
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.createFloorRequestButtons();
        
        //console.log(this.floorRequestButtonList);
        //console.log(this.door);
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
        while(this.floorRequestList.length != 0){
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


//----------------------------------------------------------------------// testing //--------------------------------------------------------------------------------//

// Scenario 1
// let  column1 = new Column(1, "online", 10, 2);
// console.log("Elevator A startup:", column1.elevatorList[0].currentFloor)
// console.log("Elevator B startup:", column1.elevatorList[1].currentFloor)

// column1.elevatorList[0].currentFloor = 2
// column1.elevatorList[1].currentFloor = 6

// console.log("Elevator A idle:", column1.elevatorList[0].currentFloor)
// console.log("Elevator B idle:", column1.elevatorList[1].currentFloor)

// let elevator1 = column1.requestElevator(3, "up")
// console.log("Elevator A goes to user:", column1.elevatorList[0].currentFloor)
// elevator1.requestFloor(7)
// console.log("Elevator A after user travel:", column1.elevatorList[0].currentFloor)


// Scenario 2
// let column2 = new Column(1, "online", 10, 2)

// column2.elevatorList[0].currentFloor = 10
// column2.elevatorList[1].currentFloor = 3
// elevators at the begining
// console.log("Elevator A idle:", column2.elevatorList[0].currentFloor)
// console.log("Elevator B idle:", column2.elevatorList[1].currentFloor)
// console.log("User at floor 1 wants to go to floor 6")
// let elevator2 = column2.requestElevator(1, "up")
// elevator2.requestFloor(6)
// console.log("Elevator B after user travel:", column2.elevatorList[1].currentFloor)

// console.log("2 minutes later...")

// console.log("User at floor 3 wants to go to floor 5")
// let elevator3 = column2.requestElevator(3, "up")
// elevator3.requestFloor(5)
// console.log("Elevator B after user travel:", column2.elevatorList[1].currentFloor)

// console.log("2 minutes later...")

// console.log("User at floor 9 wants to go to floor 2")
// let elevator4 = column2.requestElevator(9, "down")
// elevator4.requestFloor(2)
// console.log("Elevator A after user travel:", column2.elevatorList[0].currentFloor)



// Scenario 3
let column3 = new Column(1, "online", 10, 2)

column3.elevatorList[0].currentFloor = 10
column3.elevatorList[0].direction = "down"
console.log("Elevator A idle:", column3.elevatorList[0].currentFloor)

column3.elevatorList[1].currentFloor = 3
console.log("Elevator B idle:", column3.elevatorList[1].currentFloor)
console.log(" ")
console.log("Elevator B is moving to floor 6...")
console.log(" ")
column3.elevatorList[1].requestFloor(6)
console.log("Elevator A position:", column3.elevatorList[0].currentFloor)
console.log("Elevator B reached floor:", column3.elevatorList[1].currentFloor)
console.log()
console.log("User at floor 3 wants to go to floor 2")
let elevator5 = column3.requestElevator(3, "down")
elevator5.requestFloor(2)
console.log("Elevator A after user travel:", column3.elevatorList[0].currentFloor)
console.log("Elevator B floor:", column3.elevatorList[1].currentFloor)
console.log()
console.log("5 minutes later...")
console.log("User at floor 10 wants to go to floor 3")
let elevator6 = column3.requestElevator(10, "down")
elevator6.requestFloor(3)
console.log("Elevator B after user travel:", column3.elevatorList[1].currentFloor)
