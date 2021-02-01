// Residential Controller
let callbuttonID = 1
let elevatorID = 1
let floorRequestButtonID= 1

// Step 1: Initializing classes

// Column
class Column {
    constructor(id,status,amountOfFloor,amountOfElevator){
        this.id = id;
        this.status = status
        this.amountOfElevator = amountOfElevator
        this.amountOfFloor = amountOfFloor
        this.callButtonList = []
        this.elevatorList = []
    } 
    createCallButtons () {
        for(i = 0; i < this.amountOfFloor; i++){
            let callButtons = new CallButton();
            this.callButtonList.push(callButtons);
            callbuttonID ++;
        }  
    }
}


// Elelvator
class Elevator{
    
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
    
}



// Doors
class Doors{
    
}



// Scenarios
let  residentialColum = new Column(1,1,10,2)
