import React from 'react';
import {useTags} from '../hooks/useTags';
import NP from 'number-precision';
import {RecordItem} from '../hooks/useRecords';
type Props = {
    monthExpend: RecordItem[];
}

type data = {
    value:number;
    name:string;
}

const TagsSum: React.FC<Props> = (props) => {
    const {tags,getName} = useTags();
    console.log(tags);

    let tagIds: number[] = [];
    tags.forEach((t) => {
        tagIds.push(t.id);
    });
    // let y=0;
    // const x = (props.monthExpend.filter(r=>r.tagIds[0]===2)).forEach((r)=>{y=NP.plus(r.amount,y)});

    let data:data[]=[];
    for (let i=0;i<tagIds.length;i++){
        let amount = 0;
        props.monthExpend.filter(r=>r.tagIds[0]===tagIds[i]).forEach((r)=>{amount=NP.plus(r.amount,amount)})
        data.push({value:amount,name:getName(tagIds[i])})
    }

    console.log(tagIds);
    console.log(data);
    return (
        <div>tags</div>
    );
};

export {TagsSum};