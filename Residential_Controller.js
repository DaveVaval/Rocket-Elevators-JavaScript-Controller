// Column
class Column {
    constructor(id,status,amountOfFloors,amountOfElevators){
        this.id = id;
        this.status = status
        this.amountOfElevators = amountOfElevators
        this.amountOfFloors = amountOfFloors
        this.callButtonsList = []
        this.elevatorsList = []
        this.createCallButtons(); // Calling the functions to create the call buttons
        this.createElevators();   // as well as the elevators
    }
    // This creates all the call buttons on every floor
    createCallButtons(){
        let callbuttonID = 1
        let numberOfCallButtons = this.amountOfFloors
        let buttonFloor = 1
        for(let i = 0; i < numberOfCallButtons; i++){
            if(buttonFloor < this.amountOfFloors){
                let callButton = new CallButton(callbuttonID,"off",buttonFloor,"up") // The first floor will only have a Up button
                this.callButtonsList.push(callButton);
                callbuttonID ++;
            } 
            if(buttonFloor > 1){
                let callButton = new CallButton(callbuttonID,"off",buttonFloor,"Down") // the last floor will only have a Down button
                this.callButtonsList.push(callButton);
                callbuttonID ++;
            }
            buttonFloor ++;
        }
    }
    // this creates the elevators
    createElevators(){
        let elevatorID = 1
        for(let i = 0; i < this.amountOfElevators; i++){
            let elevator = new Elevator(elevatorID,"idle",this.amountOfFloors,1)
            this.elevatorsList.push(elevator);
            elevatorID ++;
        }
    }
    // This is the main method that will send en elevator once a user presses on a button
    requestElevator(requestedFloor, direction){
        let elevator = this.findElevator(requestedFloor, direction);
        elevator.floorRequestList.push(requestedFloor);
        elevator.move();
        elevator.openDoor();
        return elevator;
    }
    // this will find the best elevator depending of the score it recieves
    findElevator(requestedFloor,requestedDirection){
        let elevatorInfo = {
            bestElevator: null,
            bestScore: 5,
            referenceGap: Infinity
        }
        this.elevatorsList.forEach(elevator => {
            if(requestedFloor == elevator.currentFloor && elevator.status == "idle" && requestedDirection == elevator.direction){
                elevatorInfo = this.checkElevator(1, elevator, elevatorInfo, requestedFloor)
            }
            else if(requestedFloor > elevator.currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction){
                elevatorInfo = this.checkElevator(2, elevator, elevatorInfo, requestedFloor)
            }
            else if(requestedFloor < elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction){
                elevatorInfo = this.checkElevator(2, elevator, elevatorInfo, requestedFloor)
            }
            else if(elevator.status == "idle"){
                elevatorInfo = this.checkElevator(3, elevator, elevatorInfo, requestedFloor)
            }
            else{
                elevatorInfo = this.checkElevator(4, elevator, elevatorInfo, requestedFloor)
            }
        });
        return elevatorInfo.bestElevator;
    }
    // This will compare the score and return the adequate information
    checkElevator(baseScore, elevator, elevatorInfo, floor){
        if(baseScore < elevatorInfo.bestScore){
            elevatorInfo.bestScore = baseScore
            elevatorInfo.bestElevator = elevator
            elevatorInfo.referenceGap = Math.abs(elevator.currentFloor - floor)
        } 
        else if(elevatorInfo.bestScore == baseScore){
            let gap = Math.abs(elevator.currentFloor - floor)
            if(elevatorInfo.referenceGap > gap){
                elevatorInfo.bestScore = baseScore
                elevatorInfo.bestElevator = elevator
                elevatorInfo.referenceGap = gap
            }
        }
        return elevatorInfo;
    }
}

// Elelvator
class Elevator{
    constructor(id, status, amountOfFloors, _currentFloor){
        this.id = id
        this.status = status
        this.amountOfFloors = amountOfFloors
        this.direction = null
        this.currentFloor = _currentFloor
        this.door = new Door(id, "closed") 
        this.floorRequestButtonsList = []
        this.floorRequestList = []
        this.createFloorRequestButtons();
    }
    // method that creates the floor request buttons for each instance of elevator
    createFloorRequestButtons(){
        let floorRequestButtonID= 1
        let floorNumber = 1
        for(let i = 0; i < this.amountOfFloors; i++){
            let floorButton = new FloorRequestButton(floorRequestButtonID, "off", floorNumber)
            this.floorRequestButtonsList.push(floorButton);
            floorNumber ++;
            floorRequestButtonID ++;
        }
    }
    // This is the main method that will opperate the Elevator once it recieves a floor
    requestFloor(requestedFloor){
        this.floorRequestList.push(requestedFloor)
        this.sortFloorRequestList();
        this.move();
        this.openDoor();
    }
    // This method will make the elevator move to the value of the first index of floor request list
    move(){ 
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
    }
    // This will sort the floor request list ascending or descending 
    sortFloorRequestList(){
        if(this.direction == "up"){
            this.floorRequestList.sort(function(a,b){return a-b});
        }
        else{
            this.floorRequestList.sort(function(a,b){return b-a});
        }
    }
    // the basic door opening method
    openDoor(){
        this.door.status = "open" 
        this.door.status = "closed"
    }
}

// Call Button
class CallButton{
    constructor(id,status,floor,direction){
        this.id = id
        this.status = status
        this.floor = floor
        this.direction = direction
    }
}

// Floor Request Button
class FloorRequestButton{
    constructor(id,status,floor){
        this.id = id
        this.status = status
        this.floor = floor
    }
}

// Door
class Door{
    constructor(id,status){
        this.id = id
        this.status = status
    }
}

//----------------------------------------------------------------------// testing //--------------------------------------------------------------------------------//

function Scenario1(){
    // Creating a new instance of Column
    let  column1 = new Column(1, "online", 10, 2);
    // Setting the base attributes for this scenario
    column1.elevatorsList[0].currentFloor = 2
    column1.elevatorsList[1].currentFloor = 6
    console.log("User at floor 3 wants to go up to floor 7")
    let elevator1 = column1.requestElevator(3, "up")
    console.log("Elevator A will be sent to floor:",column1.elevatorsList[0].currentFloor)
    elevator1.requestFloor(7)
    console.log("...")
    console.log("User reaches floor",column1.elevatorsList[0].currentFloor,"and gets out")
}

function Scenario2(){
    // Creating a new instance of Column
    let column2 = new Column(2, "online", 10, 2)
    // setting the base attributes for the start of this scenario
    column2.elevatorsList[0].currentFloor = 10
    column2.elevatorsList[1].currentFloor = 3
    console.log("User is on floor 1 and presses on up...")
    // User at floor 1 wants to go up to floor 6
    // Elevator B will be sent
    let elevator2 = column2.requestElevator(1, "up")
    console.log("The column will send the Elevator B to floor:", column2.elevatorsList[1].currentFloor)
    console.log("User presses on the floor button 6 inside of the elevator")
    elevator2.requestFloor(6)
    console.log("Elevator B reached floor:",column2.elevatorsList[1].currentFloor)
    console.log("User gets out...")
    console.log("")
    console.log("2 minutes later...")
    console.log("")
    console.log("User on floor 3 wants to go up to floor 5")
    let elevator3 = column2.requestElevator(3, "up")
    console.log("Elevator B is sent to floor:", column2.elevatorsList[1].currentFloor)
    console.log("User enters the elevator and presses on floor 5")
    elevator3.requestFloor(5)
    console.log("User reaches floor",column2.elevatorsList[1].currentFloor,"and gets out")
    console.log("")
    console.log("Some time after...")
    console.log("")
    console.log("User on floor 9 wants to go up to floor 2")
    let elevator4 = column2.requestElevator(9, "down")
    console.log("Elevator A is sent to floor:", column2.elevatorsList[0].currentFloor)
    console.log("User enters the elevator and presses on floor 2")
    elevator4.requestFloor(2)
    console.log("User reaches floor",column2.elevatorsList[0].currentFloor,"and gets out")
}

function Scenario3(){
    // Creating a new instance of Column
    let column3 = new Column(3, "online", 10, 2)
    // setting the base attributes for the start of this scenario
    column3.elevatorsList[0].currentFloor = 10
    column3.elevatorsList[0].direction = "down" // elevator A is at floor 10 with direction down because it can only go down
    column3.elevatorsList[1].currentFloor = 3 // elevator B is at floor 3 and moving to floor 6
    console.log("User is on floor 3 and wants to go up to floor 2")
    console.log("Elevator A is on floor 10 and Elevator B is currently moving from floor 3 to 6")
    column3.elevatorsList[1].requestFloor(6)
    let elevator5 = column3.requestElevator(3, "down")
    console.log("Elevator A is sent to floor:", column3.elevatorsList[0].currentFloor)
    console.log("User enters the elevator and presses on floor 2")
    elevator5.requestFloor(2)
    console.log("")
    console.log("5 minutes later...")
    console.log("")
    console.log("Another user is on floor 10 and wants to go down to floor 3")
    let elevator6 = column3.requestElevator(10, "down")
    console.log("Elevator B is sent to floor:", column3.elevatorsList[1].currentFloor)
    console.log("User enters the elevator and presses on floor 3")
    elevator6.requestFloor(3)
    console.log("...")
    console.log("User reaches floor",column3.elevatorsList[1].currentFloor,"and gets out")
}

module.exports = {Column, Elevator, CallButton, FloorRequestButton, Door}