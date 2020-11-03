import React,{useMemo} from "react";
import { Column, useTable, useFlexLayout,usePagination,useSortBy } from 'react-table'
import { BasicTable } from "../views/Components/Common/Table/BasicTable/BasicTable";
// import makeData from "../utils/makeData";
// import dummyDataApi from "../utils/dummyDataApi";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TableWrapper from "TableWrapper/TableWrapper";
import dummyDataApi from "./../utils/dummyDataApi"


export const App = ()=>{

/**
 * fetchData - data for tabek
 */
  const [fetchData, setFetchData] = React.useState([]);

/**
 * page - active tabel page
 */
  const [page, setPage] = React.useState(0);
  /**
   * limit - rows in tabel
   */
  const [limit, setPageLimit] = React.useState(10);
  /**
   * fetchDataInfo info with tabel paginatio
   */
  const [fetchDataInfo, setFetchDataInfo] = React.useState({page,limit});
  
    const [sortBy, setSortBy] = React.useState("");
    const [isloading, setIsloading] = React.useState(true);   
/**
 * fetchConwert - create data with tabel info (pagination / page active / offset)
 * @param fetchdata - datat from server
 */
    const fetchConwert = (fetchdata:any)=>{
      return { limit:fetchdata.limit,page:fetchdata.page,total:fetchdata.total,offset:fetchdata.offset}
    }

    /**
     * Function / action for sort table
     * @param {string} name 
     */
function sortTableBy(name:string){
    setSortBy(name)
    frtchTableData(name)
   }

   /**
    * Function / action for change active page
    * @param {numer} pageNum 
    */
function changePage(pageNum:number){
  setPage(pageNum)
  frtchTableData({page:pageNum,limit})
}
/**
 * function / action for change rows per page
 * @param {number} limitNum 
 */
const changeLimit = (limitNum:number)=>{
  setPageLimit(limitNum)
  frtchTableData({page,limit:limitNum})
}
/**
 * function / action for filter tabel
 * @param {string} key 
 */
const filterTable =(key:string)=>{
  setSortBy(key)
  frtchTableData({page,limit,sort:key})
}
/**
 * function / action for fetch dunny data
 * @param {object} option 
 */
const frtchTableData =(option:{})=>{
  setIsloading(true)
  dummyDataApi(option).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
  // tslint:disable-next-line:no-shadowed-variable
  .then(data => { 
    setFetchData(data.data)
    setFetchDataInfo(fetchConwert({...data}))
    setIsloading(false)
  })
}
    React.useEffect(() => {       

      frtchTableData({page,limit})
      },[]);
    // const data = React.useMemo(() => makeData(50), []);

    // tslint:disable-next-line:no-console  
    const columns = React.useMemo(
        () => [             
            
                {
                    Header: "ID",
                    accessor: "id"
                  },
                {
                    Header: "image",
                    accessor: "image"
                  },
              {
                Header: "firstName",
                accessor: "owner[firstName]"
              },
              {
                Header: "text",
                accessor: "text"
              },
              {
                Header: "link",
                accessor: "link"
              },
              
            
          
        ],
        []
      );
    
    const tableProps = useTable(
        {
            columns: useMemo(() => columns, [fetchData]),
            data: fetchData || [],            

        },
        useFlexLayout, useSortBy
    )
    return(
    <div>
        <Container >
        <h1>Hello tabel</h1>

        <Paper style={{padding:30, margin: "50px 0"}}>
        
        {/* @ts-ignore */}
        <BasicTable {...tableProps} loading={isloading} info={fetchDataInfo} changePage={changePage} changeLimit={changeLimit} sortTableBy={sortTableBy} filterTable={filterTable}/>

        {/* <TableWrapper {...tableProps} loading={false}><BasicTable/></TableWrapper> */}
        </Paper>
        </Container >        
    </div>
    
)}


export default App