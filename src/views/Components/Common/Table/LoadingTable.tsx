import React from 'react'
import { CircularProgress } from '@material-ui/core'

import { useStylesLoadingTable } from './styles'

export const LoadingTable = () => {
    const classes = useStylesLoadingTable()

    return (
        <div className={classes.progress} data-testid="loading-table">
            <CircularProgress />
        </div>
    )
}

export default LoadingTable
