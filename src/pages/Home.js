import { useCallback, useEffect, useRef, useState } from "react";

import Tweet from "../components/Tweet";

import { v4 as uuidv4 } from "uuid";

import { firedb, storage } from "../shared/firebaseInstance";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Home = ({ user }) => {
  const [tweets, setTweets] = useState([]);

  const [attachment, setAttachment] = useState("");
  const tweetRef = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let fileUrl = "";
    if (attachment) {
      const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
      const result = await uploadString(storageRef, attachment, "data_url");
      fileUrl = await getDownloadURL(result.ref);
    }

    const tweet = {
      text: tweetRef.current.value,
      createdAt: Date.now(),
      creatorId: user.uid,
      fileUrl,
    };
    await addDoc(collection(firedb, "tweets"), tweet);

    tweetRef.current.value = null;
    setAttachment("");
  };

  const onFileHandler = (event) => {
    const [file] = event.target.files;
    const fileRead = new FileReader();
    fileRead.onload = (finish) => {
      const { result } = finish.currentTarget;
      setAttachment(result);
    };
    fileRead.readAsDataURL(file);
  };

  const onClearHandler = () => {
    setAttachment("");
  };

  const getTweets = useCallback(() => {
    const q = query(collection(firedb, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTweets(tweetArr);
    });
  }, []);

  useEffect(() => {
    getTweets();
  }, [getTweets]);

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input ref={tweetRef} type="text" placeholder="What's on your mind?" maxLength={120} required />
        <input type="file" accept="image/*" onChange={onFileHandler} />
        <input type="submit" value="tweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="attachment" width="50px" />
            <button type="button" onClick={onClearHandler}>
              clear
            </button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} user={tweet.creatorId === user.uid} />
        ))}
      </div>
    </>
  );
};

export default Home;
