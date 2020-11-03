import React from "react"



const TableWrapper = (props: { children: any; tableProps: {}; loading: any })=>{

    const {children, tableProps, loading}=props
    return <div className="table-wrapper">
        {children(tableProps, loading)}
    </div>
}

export default TableWrapper