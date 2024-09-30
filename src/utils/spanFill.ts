/**
 * Span fill algorithm
 *
 * @link https://en.wikipedia.org/wiki/Flood_fill
 *
 * @param x 
 * @param y
 * @param inside callback to check if the point is inside the fillable area
 * @param set callback to set the point to be filled
 * 
 * note: to not cause infinite loop, you need to give inside callback always updated value with set callback

@example
const GRID_WIDTH = 2;
const GRID_HEIGHT = 2;

let grid = Array(GRID_HEIGHT)
  .fill()
  .map(() => Array(GRID_WIDTH).fill(0));

const inside = (x: number, y: number) => {
  return (
    x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT && grid[y][x] === 0
  );
}

const set = (x: number, y: number) => {
  grid[y][x] = 1;
}

console.log(grid);
// Output:
// [ [ 0, 0 ], [ 0, 0 ] ]

floodFill(1, 1, inside, set);

console.log(grid);
  // Output:
  // [ [ 1, 1 ], [ 1, 1 ] ]


 */ export const spanFill = (
  x: number,
  y: number,
  inside: (x: number, y: number) => boolean,
  set: (x: number, y: number) => void,
) => {
  if (!inside(x, y)) return

  const s: [number, number, number, number][] = [] // Using array as a stack
  s.push([x, x, y, 1])
  s.push([x, x, y - 1, -1])

  while (s.length > 0) {
    let [x1, x2, y, dy] = s.pop()!
    let x = x1

    if (inside(x, y)) {
      while (inside(x - 1, y)) {
        set(x - 1, y)
        x = x - 1
      }
      if (x < x1) {
        s.push([x, x1 - 1, y - dy, -dy])
      }
    }

    while (x1 <= x2) {
      while (inside(x1, y)) {
        set(x1, y)
        x1 = x1 + 1
      }
      if (x1 > x) {
        s.push([x, x1 - 1, y + dy, dy])
      }
      if (x1 - 1 > x2) {
        s.push([x2 + 1, x1 - 1, y - dy, -dy])
      }
      x1 = x1 + 1
      while (x1 < x2 && !inside(x1, y)) {
        x1 = x1 + 1
      }
      x = x1
    }
  }
}
