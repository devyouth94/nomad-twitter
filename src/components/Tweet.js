import React, { useRef, useState } from "react";

import { firedb } from "../shared/firebaseInstance";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const Tweet = ({ tweet, user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const editTweetRef = useRef(null);

  const onDeleteHandler = async () => {
    const ok = window.confirm("트윗을 삭제합니다");
    if (ok) {
      await deleteDoc(doc(firedb, "tweets", `${tweet.id}`));
    }
  };

  const onUpdateHandler = async (event) => {
    event.preventDefault();
    await updateDoc(doc(firedb, "tweets", `${tweet.id}`), { text: editTweetRef.current.value });
    setIsEdit(false);
  };

  const onEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div>
      {isEdit ? (
        <>
          <form onSubmit={onUpdateHandler}>
            <input type="text" ref={editTweetRef} defaultValue={tweet.text} required />
            <input type="submit" value="update" />
          </form>
          <button onClick={onEditToggle}>cancel</button>
        </>
      ) : (
        <>
          <h4>{tweet.text}</h4>
          {user && (
            <>
              <button onClick={onDeleteHandler}>delete</button>
              <button onClick={onEditToggle}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
