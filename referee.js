import { updatePiecePos } from "./movement/movmentFunctions";

function getRowPossibleMoves(x, y, color, board, left = false){
    let moves = [];
    //destra aumentando le x e sinistra diminuendole
    left ? x-- : x++
    for (x; x < board.length && x >= 0; left ? x-- : x++){
        if (board[y][x] != null) {
            if (board[y][x].color !== color)
                moves.push({x: x, y: y})
            break;
        }
        moves.push({x: x, y:y})
    }

    return moves;
}
function getColPossibleMoves(x, y, color, board, up = false){
    let moves = [];
    //destra aumentando le y e sinistra diminuendole
    up ? y-- : y++;
    for (y; y < board.length && y >= 0; up ? y-- : y++){
        if (board[y][x] != null){
            if (board[y][x].color !== color)
                moves.push({x: x, y: y})
            break;
        }
        moves.push({x: x, y: y})
    }
    return moves;
}

function getDiagonalsPossibleMoves(x, y, color, board, left = false, up = false){
    let moves = [];
    //destra aumentando le y e sinistra diminuendole
    up ? y-- : y++;
    left ? x-- : x++
    while ((x < board.length && x >= 0) && (y < board.length && y >= 0)){
        if (board[y][x] != null){
            if (board[y][x].color !== color)
                moves.push({x: x, y:y})
            break
        }
        moves.push({x: x, y:y})
        up ? y-- : y++;
        left ? x-- : x++
    }
    return moves;
}

//return tutte le posizioni dove il pawn puo mangiare (se presente il pezzo)
function pawnPossibleEatMoves(x, y, pieceColor, board, lastLog){
    return checkForEnPassant(x, y, lastLog).concat(pieceColor === "white" ? [board[y-1][x+1] && [x+1, y-1], board[y-1][x-1] && [x-1, y-1], ]: [board[y+1][x+1] && [x+1, y+1], board[y+1][x-1] && [x-1, y+1]]);
}

function checkPosition(possibleMoves, board, pieceColor){
    let moves = []
    for (let move of possibleMoves){
        if (!move) continue;
        let [newX, newY] = move;
        //se invalida la posizione (fuori board, pezzo amico)
        if (newX < 0 || newY < 0 || newX > 7 || newY > 7 || (board[newY][newX] && board[newY][newX].color === pieceColor))
            continue;
        moves.push({x:newX,y:newY});
    }
    return moves;
}

function checkForCastle(x,y, board, lastLog){
    //se il king si e' mosso niente castle
    if (board[y][x].hasMoved || isCheck(board, board[y][x].color, lastLog))  return [];
    let arr = []

    if (board[y][x].color === "white"){
        if (board[7][0] && board[7][0].type === "rook" && !board[7][0].hasMoved){
            let leftRookMoves = getRowPossibleMoves(x,y,board[y][x].color,board,true);
            if (leftRookMoves.length !== 0){ //se tutti azzeccati pezzi e non c'e' neanche uno spazio vuoto === no castle
                let leftRook = board[leftRookMoves.at(-1).y][leftRookMoves.at(-1).x-1];
                arr.push(leftRook === board[7][0] && [x - 2, y])
            }
        }if (board[7][7] && board[7][7].type === "rook" && !board[7][7].hasMoved){
            let rightRookMoves = getRowPossibleMoves(x,y,board[y][x].color,board);
            if (rightRookMoves.length !== 0){ //se tutti azzeccati pezzi e non c'e' neanche uno spazio vuoto === no castle
                let rightRook = board[rightRookMoves.at(-1).y][rightRookMoves.at(-1).x+1];
                arr.push(rightRook === board[7][7] && [x + 2, y])
            }
        }
    }else{
        if (board[0][0] && board[0][0].type === "rook" && !board[0][0].hasMoved){
            let leftRookMoves = getRowPossibleMoves(x,y,board[y][x].color,board,true);
            if (leftRookMoves.length !== 0){ //se tutti azzeccati pezzi e non c'e' neanche uno spazio vuoto === no castle
                let leftRook = board[leftRookMoves.at(-1).y][leftRookMoves.at(-1).x-1];
                arr.push(leftRook === board[0][0] && [x - 2, y])
            }
        }if (board[0][7] && board[0][7].type === "rook" && !board[0][7].hasMoved){
            let rightRookMoves = getRowPossibleMoves(x,y,board[y][x].color,board);
            if (rightRookMoves.length !== 0){ //se tutti azzeccati pezzi e non c'e' neanche uno spazio vuoto === no castle
                let rightRook = board[rightRookMoves.at(-1).y][rightRookMoves.at(-1).x+1];
                arr.push(rightRook === board[0][7] && [x + 2, y])
            }
        }
    }
    return arr;
}

function checkForEnPassant(x, y, lastLog){
    return [lastLog && Math.abs(lastLog.data.y - lastLog.data.newY) === 2 && Math.abs(x - lastLog.data.newX) === 1 && y === lastLog.data.newY && [lastLog.data.newX, (lastLog.data.y + lastLog.data.newY)/2]]
}

function getPawnPossibleMoves(x, y, pieceColor, board, lastLog){
    let possibleMoves = pawnPossibleEatMoves(x,y,pieceColor,board,lastLog).concat(pieceColor === "white" 
        ? [!board[y-1][x] && [x, y-1], y === 6 && !board[y-2][x] && !board[y-1][x] && [x, y-2]] : [!board[y+1][x] && [x, y+1], y === 1 && !board[y+1][x] && !board[y+2][x] && [x, y+2]])
    return checkPosition(possibleMoves, board, pieceColor);
}

function getKnightPossibleMoves(x, y, pieceColor, board){
    let possibleMoves = [[x-2,y+1], [x-1, y+2], [x+1, y+2], [x+2, y+1], [x+2, y-1], [x+1, y-2], [x-1, y-2], [x-2, y-1]];
    return checkPosition(possibleMoves, board, pieceColor);
}

function getRookPossibleMoves(x, y, pieceColor, board){
    //left/right
    return getRowPossibleMoves(x, y, pieceColor, board, true).concat(getRowPossibleMoves(x, y, pieceColor, board))
        //top/bottom
        .concat(getColPossibleMoves(x, y, pieceColor, board, true)).concat(getColPossibleMoves(x, y, pieceColor, board));
}

function getBishopPossibleMoves(x, y, pieceColor, board){
    //left/right
    return getDiagonalsPossibleMoves(x, y, pieceColor, board).concat(getDiagonalsPossibleMoves(x, y, pieceColor, board, true))
        //top/bottom
        .concat(getDiagonalsPossibleMoves(x, y, pieceColor, board, false, true)).concat(getDiagonalsPossibleMoves(x, y, pieceColor, board, true, true));
}

function getQueenPossibleMoves(x, y, pieceColor, board){
    return getRookPossibleMoves(x, y, pieceColor, board).concat(getBishopPossibleMoves(x, y, pieceColor, board));
}

function getKingPossibleMoves(x, y, pieceColor, board,lastLog){
    let possibleMoves = checkForCastle(x,y,board,lastLog).concat([[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y], [x+1,y], [x-1,y+1], [x, y+1], [x+1, y+1]]);
    return checkPosition(possibleMoves, board, pieceColor);
}

function isCheck(board, kingColor, lastLog){
    //x, y del king
    let kingPos = {}
    let allMoves = [] 

	// ciclo per ogni piece
    board.forEach((pieceRow, row) => {
        return pieceRow.forEach((piece, col) => {
            //setto le cordinate del king da vedere se sotto scacco
            if (piece && piece.type === "king" && piece.color === kingColor)  kingPos = {x:col, y:row}
            //se insieme di squadra o pezzo vuoto
            if (!piece || piece.color === kingColor || piece.type === "king") return;

            allMoves = allMoves.concat(getPossibleMoves(col, row, board, lastLog))
        })
    })

    return allMoves.some( move => move.x === kingPos.x && move.y === kingPos.y)
}

//per ogni moves simulo il movimento e vedo se chkeck, ritorno la lista di moves che non causano il check
function notCheckMoves(x, y, moves, board, kingColor, lastLog){
    let legalMoves = []
    moves.forEach((move) => {
        //simulo il movimento e poi vedo se e' check
        let newBoard = updatePiecePos(JSON.parse(JSON.stringify(board)), JSON.parse(JSON.stringify(board))[y][x], move.x, move.y)
        if (!isCheck(newBoard, kingColor, lastLog))
            legalMoves.push(move);
    })
    return legalMoves;
}

function isCheckMate(board, kingColor, lastLog){
    let checkMate = true;
    board.forEach((pieceRow) => {
        return pieceRow.forEach((piece) => {
            if (!piece || piece.color !== kingColor) return;
            if (notCheckMoves(piece.x, piece.y, getPossibleMoves(piece.x, piece.y, board, lastLog), board, kingColor, lastLog).length !== 0){
                checkMate = false;
                return;
            }
        })
    })
    return checkMate;
}


//board is a doouble index array of object of class PieceClass, return all the possible position the piece can go
function getPossibleMoves(x,y, board, lastLog){
    const color = board[y][x].color;
    const type = board[y][x].type;

    switch (type){
        case "pawn": 
            //normal move and doubleMove
            return getPawnPossibleMoves(x, y, color, board, lastLog);
        case "rook":
            //top, left, right, bottom
            return getRookPossibleMoves(x, y, color, board);
        case "bishop":
            //diagonals
            return getBishopPossibleMoves(x, y, color, board);
        case "king":
            //su giu destra sinistra e diagonali (solo 1 blocco pero)
            return getKingPossibleMoves(x, y, color, board, lastLog);
        case "queen":
            //bishop and rook combined
            return getQueenPossibleMoves(x, y, color, board);
        case "knight":
            //L movement
            return getKnightPossibleMoves(x, y, color, board);
        default:
            break;
    }
}

function getValidMoves(x, y, board, lastLog){
    return notCheckMoves(x,y, getPossibleMoves(x, y, board, lastLog), board, board[y][x].color);
}

export {isCheck, isCheckMate, getValidMoves, getPawnPossibleMoves, getKnightPossibleMoves, checkForEnPassant};
