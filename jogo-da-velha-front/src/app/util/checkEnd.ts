export const checkEnd = (moves: number[][]) => {
    const boxes=moves.flat();
    return boxes.every((box)=>box!==0);
    
}