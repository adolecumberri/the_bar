// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
let findShortestPath = function (startCoordinates, grid) {
    let distanceFromTop = startCoordinates[0];
    let distanceFromLeft = startCoordinates[1];
  
    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    let location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: "Start",
    };
  
    // Initialize the queue with the start location already inside
    let queue = [location];
  
    // Loop through the grid searching for the goal
    while (queue.length > 0) {
      // Take the first location off the queue
      let currentLocation = queue.shift();
  
      // Explore Top
      let newLocation = exploreInDirection(currentLocation, "Top", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }
  
      // Explore Rigth
      newLocation = exploreInDirection(currentLocation, "Rigth", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }
  
      // Explore Bottom
      newLocation = exploreInDirection(currentLocation, "Bottom", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }
  
      // Explore Left
      newLocation = exploreInDirection(currentLocation, "Left", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }
    }
  
    // No valid path found
    return false;
  };
  
  // This function will check a location's status
  // (a location is "valid" if it is on the grid, is not an "obstacle",
  // and has not yet been visited by our algorithm)
  // Returns "Valid", "Invalid", "Blocked", or "Goal"
  let locationStatus = function (location, grid) {
    let gridSize = grid.length;
    let dft = location.distanceFromTop;
    let dfl = location.distanceFromLeft;
  
    if (
      location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize
    ) {
      // location is not on the grid--return false
      return "Invalid";
    } else if (grid[dft][dfl] === "Goal") {
      return "Goal";
    } else if (grid[dft][dfl] !== "Empty") {
      // location is either an obstacle or has been visited
      return "Blocked";
    } else {
      return "Valid";
    }
  };
  
  // Explores the grid from the given location in the given
  // direction
  let exploreInDirection = function (currentLocation, direction, grid) {
    let newPath = currentLocation.path.slice();
    newPath.push(direction);
  
    let dft = currentLocation.distanceFromTop;
    let dfl = currentLocation.distanceFromLeft;
  
    if (direction === "Top") {
      dft -= 1;
    } else if (direction === "Rigth") {
      dfl += 1;
    } else if (direction === "Bottom") {
      dft += 1;
    } else if (direction === "Left") {
      dfl -= 1;
    }
  
    let newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: "Unknown",
    };
    newLocation.status = locationStatus(newLocation, grid);
  
    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === "Valid") {
    //   grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = "Visited";
    }
  
    return newLocation;
  };
  
  // OK. We have the functions we need--let's run them to get our shortest path!
  
  // // Create a 4x4 grid
  // // Represent the grid as a 2-dimensional array
  // var gridSize = 4;
  // var grid = [];
  // for (var i = 0; i < gridSize; i++) {
  //   grid[i] = [];
  //   for (var j = 0; j < gridSize; j++) {
  //     grid[i][j] = "Empty";
  //   }
  // }
  
  // // Think of the first index as "distance from the top row"Visited
  // // Think of the second index as "distance from the left-most column"
  
  // // This is how we would represent the grid with obstacles above
  // grid[0][0] = "Start";
  // grid[2][2] = "Goal";
  
  // grid[1][1] = "Obstacle";
  // grid[1][2] = "Obstacle";
  // grid[1][3] = "Obstacle";
  // grid[2][1] = "Obstacle";
  
  // //el mapa tiene que tener una grid. la cual  actualizo dependendo de las sillas cogidas
  // console.log(findShortestPath([0, 0], grid));
  