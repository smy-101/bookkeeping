import React from 'react';
import {useTags} from '../hooks/useTags';
import NP from 'number-precision';
import {RecordItem} from '../hooks/useRecords';
import {PieChart} from './Piechart';
type Props = {
    monthExpend: RecordItem[];
}

export type data = {
    value:number;
    name:string;
}

const TagsSum: React.FC<Props> = (props) => {
    const {tags,getName} = useTags();

    let tagIds: number[] = [];
    tags.forEach((t) => {
        tagIds.push(t.id);
    });

    let data:data[]=[];
    for (let i=0;i<tagIds.length;i++){
        let amount = 0;
        if (props.monthExpend.filter(r=>r.tagIds[0]===tagIds[i]).length===0){
        }else {
            props.monthExpend.filter(r=>r.tagIds[0]===tagIds[i]).forEach((r)=>{amount=NP.plus(r.amount,amount)})
            data.push({value:amount,name:getName(tagIds[i])})
        }
    }

    console.log(tagIds);
    console.log(data);
    return (
        <PieChart data={data}/>
    );
};

export {TagsSum};