/* 

    I need a function knightMoves([startcoord],[endcoord])
    That shows the shortest path to get to the end coord 

    To do this:
    Call knightMoves([startcoord],[endcoord])
    we'll need 2 arrays:
        - parent array that stores each visited coords parent
        - path coord that we populate on the way back using
        the parent of each coord starting from the goal coord.
        We'll reverse this to get the shortest path.

    if startcoord != endcoord
        - need a function performAvailableMoves()
            DONE - this calls performAvailableMoves() again, from all of the
            available spots for the knight based on it's current location.

            DONE - These moves will need to be added to a queue before executing
            because we want to perform them depth-first not breadth-first

            DONE - we also need to store each of these spots we're visiting to
            the parent array as we queue all these up so we have a record
            of what was visited and don't waste moves

            - if any of the available spots is the endcoord, don't queue
            up performAvailableMoves() on any of the available spots. Instead,
            add the endcoord to the parent array with the current coord as the
            parent value, and call createPathFromParents([goalCoord])

    createPathFromParents([goalcoord])
        - this will take the parent node for the input coord, and recursively
        will travel through the parent nodes until it reaches the original
        startcoord
    


    note: use a map instead of an array for parents

    How to convert a coord into a string, then convert it back into an
    array of numbers

    let string = coord.join();
    let newArray = string.split(`,`).map(Number))



*/

/* 
    Call knightMoves([startcoord],[endcoord])
    we'll need 2 arrays:
        - parent array that stores each visited coords parent
        - path array that we populate on the way back using
        the parent of each coord starting from the goal coord.
        We'll reverse this to get the shortest path.
*/

function knightMoves(startcoord, endcoord) {
    const parents = {}; // each coord's parent
    const path = []; // the shortest path to the endcoord
    let queue = [];
    let found = false;

    const performAvailableMoves = (currentCoords, previousCoords) => {
        // returns the original array in 0 and the new array in 1
        const translateCoord = (xy) => {
            return [
                currentCoords,
                [currentCoords[0] + xy[0], currentCoords[1] + xy[1]],
            ];
        };

        // when the coords are found
        if (currentCoords.join() == endcoord.join()) {
            parents[currentCoords.join()] = previousCoords;
            queue = [];
            console.log("found coords");
            found = true;
            return;
        }

        // check all 8 valid moves
        queue.push(translateCoord([2, 1]));
        queue.push(translateCoord([2, -1]));
        queue.push(translateCoord([1, -2]));
        queue.push(translateCoord([-1, -2]));
        queue.push(translateCoord([-2, -1]));
        queue.push(translateCoord([-2, 1]));
        queue.push(translateCoord([-1, 2]));
        queue.push(translateCoord([1, 2]));
    };

    /*
        this will make sure the move is valid a valid coord is
        one that hasn't been used yet, and is within the bounds of
        the chessboard
    */
    const isValidCoord = (coord) => {
        // if coord doesn't exist in parents
        // if coord doesn't exceed the boundaries (0 - 7)

        return (
            !parents[coord.join()] &&
            coord[0] <= 7 &&
            coord[1] <= 7 &&
            coord[0] >= 0 &&
            coord[1] >= 0
        );
    };

    const makeMove = (coords) => {
        // coords 0 will be the starting coords
        // coords 1 will be the coords of the move

        let validMove = isValidCoord(coords[1]);
        if (validMove) {
            parents[coords[1].join()] = coords[0];
            performAvailableMoves(coords[1], coords[0]);
        } else {
        }
    };

    const generatePathFromParents = (coords) => {
        console.log("generatePathFromParents");

        const findStart = (currentCoords) => {
            path.push(currentCoords);
            if (parents[currentCoords.join()] == startcoord.join()) {
                path.push(parents[currentCoords.join()]);
                console.log(path.reverse());
            } else {
                findStart(parents[currentCoords.join()]);
            }
        };

        findStart(coords);
    };

    performAvailableMoves(startcoord);
    let levels = 0;
    while (queue.length > 0) {
        // currentCoords here will be [startcoords, movecoords]
        // so two pairs of x,y
        let currentCoords = queue.shift();
        makeMove(currentCoords);
    }
    if (found) {
        generatePathFromParents(endcoord);
    }
}

knightMoves([1, 3], [7, 7]);
