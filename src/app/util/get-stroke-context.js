import React from 'react';

let StrokeContext;

export const getStrokeContext = () => {
    if (StrokeContext) {
        return StrokeContext;
    }

    StrokeContext = React.createContext();
    return StrokeContext;
};
