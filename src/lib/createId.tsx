let id= parseInt(window.localStorage.getItem('IdMax')||'0');


const createId = ()=>{
    id+=1;
    window.localStorage.setItem('IdMax',JSON.stringify(id));
    return id;
};


export {createId}