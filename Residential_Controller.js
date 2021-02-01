// Residential Controller
let callbuttonID = 1
let elevatorID = 1
let floorRequestButtonID= 1

// Step 1: Initializing classes

// Column
class Column {
    constructor(id,status,amountOfFloor,amountOfElevator){
        console.log("number of floor: ", amountOfFloor);
        this.id = id;
        this.status = status
        this.amountOfElevator = amountOfElevator
        this.amountOfFloor = amountOfFloor
        this.callButtonList = []
        this.elevatorList = []
        this.createCallButtons();
    }
    createCallButtons(){
        for(let i = 0; i < this.amountOfFloor; i++){
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
let  residentialColum = new Column(1,1,10,2)
