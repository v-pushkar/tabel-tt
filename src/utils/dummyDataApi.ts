// tslint:disable-next-line:variable-name
const _baseURL:string = "https://dummyapi.io/data/api/post"


function doFetch(input: RequestInfo, init?: RequestInit):Promise<any>{
    
    return fetch(input, init)
}
type fetchoptions = {
    headers: Headers;
    method: string;
    redirect: string;
}

export default function dummyDataApi (options?:any){

    let optString:string ="?"

    if(options){
        Object.keys(options).forEach(key=>{
            const val:any = options[key]
            optString =`${optString}&${key}=${val}`
        })
    }
    const url = _baseURL+ optString;
    const headers = new Headers()
    headers.append("app-id", "5f9bf14e6d063f459eb62da8");

// tslint:disable-next-line:no-shadowed-variable
const fetchoptions:any = {
    headers,
    method: 'GET', 
    redirect: 'follow',
  
};

    return doFetch(url, fetchoptions)
}

