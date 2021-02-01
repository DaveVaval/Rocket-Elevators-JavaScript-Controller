// Residential Controller
let callbuttonID = 1
let elevatorID = 1
let floorRequestButtonID= 1

// Step 1: Initializing classes

// Column
class Column {
    constructor(_id,_status,_amountOfFloor,_amountOfElevator){
        console.log("number of floor: ", _amountOfFloor);
        this.id = _id;
        this.status = _status
        this.amountOfElevator = _amountOfElevator
        this.amountOfFloor = _amountOfFloor
        this.callButtonList = []
        this.elevatorList = []
        this.createCallButtons();
        console.log(this.callButtonList);
    }
    createCallButtons(){
        let numberOfCallButtons = this.amountOfFloor
        let buttonFloor = 1
        for(let i = 0; i < numberOfCallButtons; i++){
            if(buttonFloor < this.amountOfFloor){
                let callButton = new CallButton(callbuttonID,"off",buttonFloor,"up")
                this.callButtonList.push(callButton);
                callbuttonID ++;
            } 
            if(buttonFloor > 1){
                let callButton = new CallButton(callbuttonID,"off",buttonFloor,"Down")
                this.callButtonList.push(callButton);
                callbuttonID ++;
            }
            buttonFloor ++;
        }
    }
}


// Elelvator
class Elevator{
    constructor(_id,_status,_amountOfFloor,_currentFloor){
        this.id = _id
        this.status = _status
        this.amountOfFloor = _amountOfFloor
        this.direction = upOrdown
        this.currentFloor = _currentFloor
        this.door = new Doors();
        this.floorRequestButtonList = []
    }
}




// Call Button
class CallButton{
    constructor(_id,status,floor,direction){
        this.id = _id
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



// Doors
class Doors{
    constructor(id,status){
        this.id = id
        this.status = status
    }
}



// Scenarios
let  residentialColum = new Column(1,1,10,2);
