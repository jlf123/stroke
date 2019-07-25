import React from 'react';
import './icon.less';

const StrokeIcon = ({ src, onClick }) => (
    <img
        className="stroke-icon"
        src={src}
        onClick={() => (onClick ? onClick() : null)}
    />
);

export default StrokeIcon;