import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import {CategorySection} from './Money/CategorySection';
import styled from 'styled-components';
import {RecordItem, useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
import dayjs from 'dayjs';
import Icon from '../components/Icon';

const CategoryWrapper = styled.div`
  background: white;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;

  > .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
`;
const Header = styled.h3`
  padding: 10px 16px;
  line-height: 20px;
  font-size: 18px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  >.icon{
    height: 30vh;
    width: 30vw;
  }

`

function Statistics() {
    const [category, setCategory] = useState<'+' | '-'>('-');
    const {records,deleteRecord} = useRecords();
    const {getName} = useTags();
    const hash: { [Key: string]: RecordItem[] } = {};
    const selectedRecords = records.filter(r => r.category === category);
    selectedRecords.forEach(r => {
        const key = dayjs(r.date).format('YYYY-MM-DD');
        if (!(key in hash)) {
            hash[key] = [];
        }
        hash[key].push(r);
    });
    const array = Object.entries(hash).sort((a, b) => {
        if (a[0] === b[0]) return 0;
        if (a[0] > b[0]) return -1;
        if (a[0] < b[0]) return 1;
        return 0;
    });

    const findItem = (c:string)=>{
        const index = records.findIndex(r=>r.createdAt===c)
        if (window.confirm('确认要删除这条记录吗')){
            deleteRecord(index)
            window.alert("删除记录成功");
        }
    }
    // console.log(records);

    return (
        <Layout content="明细">
            <CategoryWrapper>
                <CategorySection value={category}
                                 onChange={value => setCategory(value)}/>
            </CategoryWrapper>
            {selectedRecords.length===0 ?
                <Wrapper>
                    <Icon name="nodata"/>
                </Wrapper>
                 :
            array.map(([date, records]) => <div key={records[0].createdAt} >
                    <Header>
                        {date}
                    </Header>
                    <div>
                        {records.map(r => {
                            return <Item key={r.createdAt} onClick={()=>findItem(r.createdAt)}>
                                <div className="tags oneLine">
                                    {r.tagIds.map(tagId => <span key={tagId}>{getName(tagId)}</span>)}
                                </div>
                                {r.note && <div className="note">
                                    {r.note}
                                </div>}
                                <div className="amount">
                                    ￥{r.amount}
                                </div>
                            </Item>;
                        })}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export {Statistics};