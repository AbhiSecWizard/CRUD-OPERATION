import { useEffect, useState } from "react";
import { addPost, updateData } from "../../API/PostApi";
import "./Form.css";

export const Form = ({ data, setData, editData, setEditData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });

  // ✅ Pre-fill form when editData changes
  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      setAddData({
        title: editData.title || "",
        body: editData.body || ""
      });
    }
  }, [editData]);

  // ✅ Handle input change
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Add new post
  const addPostDataFunc = async () => {
    try {
      const res = await addPost(addData);
      if (res.status === 201) {
        setData([...data, res.data]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // ✅ Update existing post
  const updateAddPostDataFunc = async () => {
    try {
      const res = await updateData(editData.id, addData);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === editData.id ? res.data : curElem
          )
        );
        setAddData({ title: "", body: "" });
        setEditData({});
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // ✅ Form submission handler
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "ADD") {
      await addPostDataFunc();
    } else if (action === "EDIT") {
      await updateAddPostDataFunc();
    }
  };

  const isEmpty = Object.keys(editData).length === 0;

  return (
    <form onSubmit={handleSubmitForm} className="form-container">
      <input
        type="text"
        name="title"
        placeholder="Add Title"
        value={addData.title}
        onChange={handleChangeInput}
        className="form-input"
      />
      <input
        type="text"
        name="body"
        placeholder="Add Body"
        value={addData.body}
        onChange={handleChangeInput}
        className="form-input"
      />
      <button type="submit" className="form-btn" value={isEmpty ? "ADD" : "EDIT"}>
        {isEmpty ? "ADD" : "EDIT"}
      </button>
    </form>
  );
};
