import React, { useRef, useState } from "react";

import { firedb, storage } from "../shared/firebaseInstance";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Tweet = ({ tweet, user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const editTweetRef = useRef(null);

  const onDeleteHandler = async () => {
    const ok = window.confirm("트윗을 삭제합니다");
    if (ok) {
      await deleteDoc(doc(firedb, "tweets", `${tweet.id}`));
      if (tweet.fileUrl !== "") {
        await deleteObject(ref(storage, tweet.fileUrl));
      }
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
          {tweet.fileUrl && <img src={tweet.fileUrl} width="50px" alt={"file"} />}
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
