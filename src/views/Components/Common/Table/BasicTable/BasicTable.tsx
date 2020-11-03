import React, {useEffect} from 'react'
import { TableInstance } from 'react-table'
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, 
    TablePagination,
    TableSortLabel,
    Grid   
} from '@material-ui/core'

import InputBase from '@material-ui/core/InputBase';
import { getStyles, tableProps } from './styles'
import LoadingTable from '../LoadingTable'
import EmptyTableText from '../EmptyTableText'

export interface BasicTable<D extends object> extends TableInstance<D> {
    customClasses?: any
    loading?: boolean
    customTableProps?: any
    info?:any
    changeLimit?:any
    changePage?:any
    sortTableBy?:any
    filterTable?:any
    name?:any
    onClick() : void
    
    
}

export const BasicTable = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    
    rows,
   
    prepareRow,
    loading,
    customClasses,
    customTableProps,
    info, // tabel info (page, rowr perpage, pagination)
    sortTableBy,
    changeLimit,
    changePage,
    filterTable,
}: BasicTable<any>) => {
    const classes = customClasses ? customClasses : getStyles()
    const {
        getCustomTableProps,
        getCustomHeaderGroupProps,
        getCustomHeaderProps,
        getCustomTableBodyProps,
        getCustomRowProps,
        getCustomCellProps
    } = customTableProps ? customTableProps : tableProps(classes)

  

    const [sortBy, setSortBy] = React.useState("") 

    const handleSortTable=(event: React.MouseEvent<HTMLElement>, key:any)=>{
        event.preventDefault();   
        setSortBy(key)
        sortTableBy(key)
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        changePage(newPage)    
      };
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
         changeLimit(parseInt(event.target.value, 10));        
      };
      const handleFilterTabel =(event: React.ChangeEvent<HTMLInputElement>)=>{
          event.preventDefault()
        filterTable(event.target.value)
      }

    return (
        <Paper className={classes.root}>
            <>
            <Grid
                container={true}
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
            <Paper component="form" elevation={2}>
     
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleFilterTabel}
      />        
    </Paper> 
    <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={info.total}
          rowsPerPage={info.limit}
          page={info.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /></Grid>
           
        {loading &&  <>
        <Table {...getTableProps(getCustomTableProps())}>
                        <TableHead className={classes.tableHead}>
                            {headerGroups.map((headerGroup, i) => (
                                <TableRow
                                    {...headerGroup.getHeaderGroupProps(
                                        getCustomHeaderGroupProps(
                                            headerGroup,
                                            i
                                        )
                                    )}
                                >                                    
                                    {headerGroup.headers.map((column, idx) => (
                                        <TableCell
                                            {...column.getHeaderProps(
                                                getCustomHeaderProps(column, idx)
                                            )}
                                            classes={{ root: column.className }}
                                        >
                                            {column.render('Header')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody
                            {...getTableBodyProps(getCustomTableBodyProps())}
                        ></TableBody>
                    </Table>
                    <LoadingTable /></>}
        {!loading && <Table {...getTableProps(getCustomTableProps())}>
                    <TableHead className={classes.tableHead}>
                        {headerGroups.map((headerGroup, i) => (
                            <TableRow
                                {...headerGroup.getHeaderGroupProps(
                                    getCustomHeaderGroupProps(headerGroup, i)
                                )}
                            >
                                {headerGroup.headers.map((column, item) => (
                                    <TableCell
                                        {...column.getHeaderProps(
                                            getCustomHeaderProps(column, item)
                                        )}
                                        classes={{ root: column.className }}                                    
                                          // @ts-ignore
                                        // tslint:disable-next-line:jsx-no-lambda
                                        onClick={(e)=>{handleSortTable(e,column.id)}}
                                   
                                    >
                                        {column.render('Header')}
                                        {column.id === sortBy && "↓"}
                                        
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody
                        {...getTableBodyProps(getCustomTableBodyProps())}
                    >
                        {rows.map((row, idx) => {
                            prepareRow(row)
                            return (
                                <TableRow 
                                    {...row.getRowProps(
                                        getCustomRowProps(row, idx)
                                    )}
                                >
                                    {row.cells.map((cell, index) => {
                                        return (
                                            // tslint:disable-next-line:jsx-key
                                            <TableCell 
                                                padding="none"
                                                {...cell.getCellProps(
                                                    getCustomCellProps(
                                                        cell,
                                                        index,
                                                        row
                                                    )
                                                )}
                                            >
                                                {cell.render('Cell')}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>}
                
                {rows.length === 0 && <EmptyTableText />}
               
            </>
        </Paper>
    )
}

export default React.memo(
    BasicTable,
    (prev, next) => prev.rows === next.rows && prev.loading === next.loading
)
