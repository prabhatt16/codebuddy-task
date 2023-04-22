import { useEffect, useState } from 'react';
import Card from './Card';

function Posts() {
  const API_URL = 'https://codebuddy.review';
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(e => {
        setData(e?.data?.posts);
      });
  }, []);
  return (
    <div>
      <h3
        style={{
          textAlign: 'center',
          padding: '10px',
          borderBottom: '3px',
          borderBlockColor: 'black',
        }}
      >
        Amazing posts are here!
      </h3>
      <div className="mainOfPost">
        {data !== [] &&
          data?.map(item => (
            <Card
              key={item?.id}
              avatar={item?.avatar}
              image={item?.image}
              discription={item?.writeup}
              firstName={item?.firstName}
              lastName={item?.lastName}
            />
          ))}
      </div>
    </div>
  );
}

export default Posts;
