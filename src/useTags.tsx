import {useState} from 'react';
import {createId} from 'lib/createId';

const defaultTags = [
    {id: createId(), name: '衣'},
    {id: createId(), name: '食'},
    {id: createId(), name: '住'},
    {id: createId(), name: '行'}
];


const useTags = () => {
    const [tags, setTags] = useState<{ id: number; name: string }[]>(defaultTags);
    const findTag = (id:number)=>tags.filter(tag=>tag.id===id)[0]
    const findTagIndex = (id:number)=>{
        let result = -1;
        for(let i=0;i<tags.length;i++){
            if(tags[i].id===id){
                result=i;
                break;
            }
        }
        return result;
    };
    const updateTag = (id:number,obj:{name:string})=>{
        // const index = findTagIndex(id);
        // //由于不能直接修改数据，需要拷贝一份再修改
        // const tagsClone = JSON.parse(JSON.stringify(tags));
        // tagsClone.splice(index,1,{id:id,name:obj.name});
        // setTags(tagsClone);
        setTags(tags.map(tag=>{
            if(tag.id===id){
                return {id:id,name:obj.name};
            }else {
                return tag;
            }
        }))
    };
    const deleteTag =(id:number)=>{
        // const index = findTagIndex(id);
        // const tagsClone = JSON.parse(JSON.stringify(tags));
        // tagsClone.splice(index,1);
        // setTags(tagsClone)
        setTags(tags.filter(tag=>tag.id!==id))
    };
    return {tags: tags, setTags: setTags,findTag,findTagIndex,updateTag,deleteTag};
};

export {useTags};