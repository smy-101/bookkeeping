import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import styled from 'styled-components';
import {CategorySection} from './Money/CategorySection';
import {NoteSection} from './Money/NoteSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {TagsSection} from './Money/TagsSection';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

function Money() {
    const [selected, setSelected] = useState({
        tags: [] as string[],
        note: '',
        category: '-' as ('-' | '+'),
        amount: 0,
    });
    return (
        <MyLayout>
            <TagsSection value={selected.tags}
                         onChange={(tags) => setSelected({
                             ...selected,
                             tags: tags
                         })}
            />
            <NoteSection/>
            <CategorySection/>
            <NumberPadSection/>
        </MyLayout>
    );
}

export {Money};