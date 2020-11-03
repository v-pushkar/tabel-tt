import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'

declare module 'react-table' {
    interface ColumnInstance {
        className?: string
        rowStyle?: void
    }
}

export const getStyles = makeStyles((theme: Theme) => ({
    root: {
        '&::-webkit-scrollbar': {
            width: '0.25rem'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 0.25rem rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 0.25rem rgba(0,0,0,0.00)'
        },
        // tslint:disable-next-line:object-literal-sort-keys
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)'
        },
        overflowX: 'auto',
        overflowY: 'auto',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '0'
    },
    // tslint:disable-next-line:object-literal-sort-keys
    evenRow: {
        backgroundColor: "#1769aa"
    }
}))

export const tableProps = (classes: any) => ({
    getCustomTableProps: () => ({}),
    // tslint:disable-next-line:object-literal-sort-keys
    getCustomHeaderGroupProps: (input: any, index: number) => ({}),
    getCustomHeaderProps: (input: any, index: number) => ({
        style: {
            border: 'none'
        }
    }),
    getCustomTableBodyProps: () => ({}),
    getCustomRowProps: (input: any, index: number, style: any) => ({
        className: clsx({
            [classes.evenRow]: index % 2 === 0,
            [classes.oddRow]: index % 2 === 1
        })
    }),
    getCustomCellProps: (input: any, index: number) => ({
        style: {
            overflow: 'hidden',
            // tslint:disable-next-line:object-literal-sort-keys
            border: 'none'
        }
    })
})
