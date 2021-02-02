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
        // console.log(this.callButtonList);
        // console.log(this.elevatorList);
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
            let elevator = new Elevator(elevatorID,"idle",this.amountOfFloor,1,"up")
            this.elevatorList.push(elevator);
            elevatorID ++;
        }
    }
}


// Elelvator
class Elevator{
    constructor(_id,_status,_amountOfFloor,_currentFloor,_direction){
        this.id = _id
        this.status = _status
        this.amountOfFloor = _amountOfFloor
        this.direction = _direction
        this.currentFloor = _currentFloor
        this.door = new Doors(1,"closed");
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.createFloorRequestButtons();
        //console.log(this.floorRequestButtonList);
    }
    createFloorRequestButtons(){
        let floorNumber = 1
        for(let i = 0; i < this.amountOfFloor; i++){
            let floorButton = new FloorRequestButton(floorRequestButtonID,"off",floorNumber)
            this.floorRequestButtonList.push(floorButton);
            floorNumber ++;
            floorRequestButtonID ++; 
        }
    }
    requestFloor(floor){
        this.floorRequestList.push(floor) // will have to come back to this
    }
    move(){
        while(this.floorRequestList != 0){
            let destination = this.floorRequestList[0];

        }
    }
    openDoors(){
        
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
let  residentialColum = new Column(1,1,10,2);
