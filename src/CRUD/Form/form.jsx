import { useState } from "react";
import { addPost } from "../../API/PostApi";
import "./Form.css"; // CSS file import kiya

export const Form = ({ data, setData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const addPostDataFunc = async () => {
    const res = await addPost(addData);
    console.log("res", res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    addPostDataFunc();
  };

  return (
    <>
      <form onSubmit={handleSubmitForm} className="form-container">
        <input
          type="text"
          autoComplete="off"
          name="title"
          id="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleChangeInput}
          className="form-input"
        />

        <input
          type="text"
          autoComplete="off"
          name="body"
          id="body"
          placeholder="Add Body"
          value={addData.body}
          onChange={handleChangeInput}
          className="form-input"
        />

        <button type="submit" className="form-btn">
          Add
        </button>
      </form>
    </>
  );
};
