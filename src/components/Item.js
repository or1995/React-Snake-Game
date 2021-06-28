import React from 'react';

import classes from './Item.module.css';

const Item = ({active}) => {
    return (
        <div className={active ? classes.activeitem : classes.item}></div>
    )
}

export default Item;