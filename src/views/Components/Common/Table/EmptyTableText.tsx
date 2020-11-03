import React from 'react'
import clsx from 'clsx'

import { useStylesEmptyTableText } from './styles'

export const EmptyTableText = () => {
    const classes = useStylesEmptyTableText()

    return (
        <div className={classes.container} data-testid="empty-table">
            <i className={clsx(['far fa-search', classes.icon])}></i>
            <div className={classes.textPrimary}>Data not found</div>
            <div>Please change searching criteria</div>
        </div>
    )
}

export default EmptyTableText
