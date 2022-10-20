import { useCallback, useEffect, useRef, useState } from "react";

import Tweet from "../components/Tweet";

import { firedb } from "../shared/firebaseInstance";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Home = ({ user }) => {
  const [tweets, setTweets] = useState([]);
  const tweetRef = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(firedb, "tweets"), {
        text: tweetRef.current.value,
        createdAt: Date.now(),
        creatorId: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
    tweetRef.current.value = null;
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
        <input type="submit" value="tweet" />
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
