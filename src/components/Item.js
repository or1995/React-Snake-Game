import React from 'react';

import classes from './Item.module.css';

const Item = ({active}) => {

    return (
        <div className={active ? ['item' ,classes.activeitem].join(' ') : 'item'}></div>
    )
}

export default Item;