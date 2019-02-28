export declare enum Direction {
    UP = "up",
    RIGHT = "right",
    DOWN = "down",
    LEFT = "left",
    BACKWARD = "backward",
    FORWARD = "forward"
}
export declare function isBackward(dir: Direction): boolean;
export declare function isForward(dir: Direction): boolean;
export declare function toString(dir: Direction): string;
