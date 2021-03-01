import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import styled from 'styled-components';
import {CategorySection} from './Money/CategorySection';
import {NoteSection} from './Money/NoteSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {TagsSection} from './Money/TagsSection';
import {useRecords} from '../hooks/useRecords';
import {Date} from '../components/Date';
import dayjs from 'dayjs';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;
const CategorySectionWrapper = styled.div`
 background: #c4c4c4;
`
const today = dayjs().format('YYYY-MM-DD');
const defaultFormData = {
    tagIds: [] as number[],
    note: '',
    category: '-' as ('-' | '+'),
    amount: 0,
    date:today
};

function Money() {
    const [selected, setSelected] = useState(defaultFormData);
    const {addRecord} = useRecords();
    type Selected = typeof selected;
    const onChange = (obj:Partial<Selected>)=>{
        setSelected({
            ...selected,
            ...obj
        })
    };
    const submit = () =>{
        if(addRecord(selected)){
            alert('保存成功')
            setSelected(defaultFormData);
        }
    };

    return (
        <MyLayout scrollTop={9999} content="记账">
            {/*{JSON.stringify(selected)}*/}
            <Date value={selected.date} onChange={(date)=>onChange({date})}/>
            <TagsSection value={selected.tagIds}
                         onChange={(tagIds) => onChange({tagIds})}/>
            <NoteSection value={selected.note}
                         onChange={(note)=>onChange({note})}/>
            <CategorySectionWrapper>
                <CategorySection value={selected.category}
                                 onChange={(category)=>onChange({category})}/>
            </CategorySectionWrapper>
            <NumberPadSection value={selected.amount}
                              onChange={(amount)=>onChange({amount})}
                              onOk={()=>{submit()}}
            />
        </MyLayout>
    );
}

export {Money};