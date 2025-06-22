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
            - this calls performAvailableMoves() again, from all of the
            available spots for the knight based on it's current location.
            - These moves will need to be added to a queue before executing
            because we want to perform them depth-first not breadth-first
            - we also need to store each of these spots we're visiting to
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

    const performAvailableMoves = (coord) => {
        let coordString = coord.join();

        // parents[coordString] = "test";

        // check all 8 valid moves
        let x = 1;
        let y = 2;
        if (isValidCoord([coord[0] + x, coord[1] + y])) {
            console.log(`coord ${[coord[0] + x, coord[1] + y]} is valid`);
            performAvailableMoves([coord[0] + x, coord[1] + y]);
        }
    };

    /*
        this will make sure the move is valid a valid coord is
        one that hasn't been used yet, and is within the bounds of
        the chessboard
    */
    const isValidCoord = (coord) => {
        // if coord doesn't exist in parents
        // if coord doesn't exceed the boundaries (0 - 7)
        return !parents[coord.join()] && coord[0] <= 7 && coord[1] <= 7;
    };

    performAvailableMoves(startcoord);
}

knightMoves([1, 3], [3, 4]);
