# JavaScript Controller

### This was one hell of a challenge!

If you want to test the script you can copy this function at the bottom, and run the script in your terminal!
Rocket Elevators TO THE MOON!
```C#
function Scenario(){
    // Creating a new instance of Column
    let column2 = new Column(2, "online", 10, 2)
    // setting the base attributes for the start of this scenario
    column2.elevatorList[0].currentFloor = 10
    column2.elevatorList[1].currentFloor = 3
    console.log("Elevator A current floor at the start:",column2.elevatorList[0].currentFloor)
    console.log("Elevator B current floor at the start:",column2.elevatorList[1].currentFloor)
    console.log("User is on floor 1 and presses on up...")
    console.log("The column will send the Elevator B to the user...")
    // User at floor 1 wants to go up to floor 6
    // Elevator B will be sent
    let elevator2 = column2.requestElevator(1, "up")
    console.log("User presses on the floor button 6 inside of the elevator")
    elevator2.requestFloor(6)
    console.log("Elevator B reached floor:",column2.elevatorList[1].currentFloor)
    console.log("User gets out...")
}
Scenario();
```
Now on to the next challenge!