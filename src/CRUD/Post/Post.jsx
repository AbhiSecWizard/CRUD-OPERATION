import { useEffect, useState } from 'react';
import { getPost, deletePost } from "../../API/PostApi.jsx";
import './Post.css';
import { Form } from '../Form/form.jsx';

export const Post = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  // ✅ Fetch posts once
  useEffect(() => {
    const getApiFunc = async () => {
      try {
        const res = await getPost();
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    getApiFunc();
  }, []);

  // ✅ Delete post from API + update state
  const handleDeleteFunc = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        setData(data.filter(post => post.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ Send current post to form for editing
  const handleEditFunc = (curElem) => setEditData(curElem);

  return (
    <div className="post-container">
      <h1 className="post-title">📰 Latest News</h1>

      <section>
        <Form
          data={data}
          setData={setData}
          editData={editData}
          setEditData={setEditData}
        />
      </section>

      <div className="post-list-wrapper">
        <ol className="post-list">
          {data.map((curElem, index) => {
            const { id, title, body } = curElem;
            return (
              <li key={id} className="post-card">
                <h2 className="post-index">#{index + 1}</h2>
                <h3 className="post-card-title">
                  Title: <span>{title}</span>
                </h3>
                <p className="post-card-body">
                  News: <span>{body}</span>
                </p>
                <div className="post-card-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditFunc(curElem)}
                  >
                    EDIT
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFunc(id)}
                  >
                    DELETE
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
