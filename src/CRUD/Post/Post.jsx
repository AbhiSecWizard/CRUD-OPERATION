import { useEffect, useState } from 'react';
import { getPost, deletePost } from "../../API/PostApi.jsx";
import './Post.css';
import { Form } from '../Form/form.jsx';

export const Post = () => {
  const [data, setData] = useState([]);
  const getApiFunc = async () => {
    const myApi = await getPost();
    const data = myApi.data;
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getApiFunc();
  }, []);
  const handleDeleteFunc = async (id) => {
    try {
      const deleteItems = await deletePost(id);
      if (deleteItems.status === 200) {
        const afterDeletePostData = data.filter((curElem) => {
          return curElem.id !== id;
        });
        setData(afterDeletePostData);
      }
    } catch (error) {
      console.log("Error From Delete Function: " + error);
    }
  };

  return (
   <>
   
    <div className="post-container">
      <h1 className="post-title">📰 Latest News</h1>
      <section>
         <Form data={data} setData={setData}/>
   </section>
      <div className="post-list-wrapper">
        <ol className="post-list">
          {data.map((curElem, index) => {
            const { id, title, body } = curElem;
            return (
              <li key={id} className="post-card">
                <h2 className="post-index">#{index + 1}</h2>
                <h3 className="post-card-title">Title: <span>{title}</span></h3>
                <p className="post-card-body">News: <span>{body}</span></p>
                <div className="post-card-buttons">
                  <button className="edit-btn">EDIT</button>
                  <button className="delete-btn" onClick={() => handleDeleteFunc(id)}>DELETE</button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
   </>
  );
};
