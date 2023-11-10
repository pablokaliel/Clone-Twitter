import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, where, deleteDoc, getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7eM44bsaoZBnFIT_1ahpwCgt0VFjkGpg",
  authDomain: "twittertest-9ab5a.firebaseapp.com",
  projectId: "twittertest-9ab5a",
  storageBucket: "twittertest-9ab5a.appspot.com",
  messagingSenderId: "388911373053",
  appId: "1:388911373053:web:5ab3ce5c4225675a1ebc94",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

interface Tweet {
  id: string;
  userAvatar: string;
  userName: string;
  userLogin: string;
  content: string;
  imageUrl: string | undefined | null;
  comments: number;
  retweets: number;
  likes: number;
  views: number;
}

export async function addTweet(tweet: Tweet): Promise<void> {
  try {
    await addDoc(collection(db, "tweets"), tweet);
    console.log("Tweet adicionado com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar tweet: ", error);
  }
}

export async function getTweets(): Promise<Tweet[]> {
  const tweetsCollection = collection(db, "tweets");
  const querySnapshot = await getDocs(tweetsCollection);
  const tweets: Tweet[] = [];

  querySnapshot.forEach((doc) => {
    const tweet = doc.data() as Tweet;
    tweets.push(tweet);
  });
  return tweets;
}

export async function uploadImage(imageFile: File): Promise<string> {
  const storageRef = ref(storage, `images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile);

  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
}

export async function addLike(tweetId: string, userId: string): Promise<void> {
  try {
    await addDoc(collection(db, "likes"), {
      tweetId,
      userId,
    });

    const tweetRef = doc(db, "tweets", tweetId);
    const tweetDoc = await getDoc(tweetRef);

    if (tweetDoc.exists()) {
      const currentLikes = tweetDoc.data().likes || 0;
      await setDoc(tweetRef, { likes: currentLikes + 1 }, { merge: true });
    }
    console.log("Like adicionado com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar like: ", error);
  }
}

export async function removeLike( tweetId: string, userId: string ): Promise<void> {
  try {
    const likesRef = collection(db, "likes");
    const q = query(
      likesRef,
      where("tweetId", "==", tweetId),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    const tweetRef = doc(db, "tweets", tweetId);
    const tweetDoc = await getDoc(tweetRef);

    if (tweetDoc.exists()) {
      const currentLikes = tweetDoc.data().likes || 0;
      await setDoc(tweetRef, { likes: currentLikes - 1 }, { merge: true });
    }
    console.log("Like removido com sucesso.");
  } catch (error) {
    console.error("Erro ao remover like: ", error);
  }
}

export async function getUserLikes(userId: string): Promise<string[]> {
  try {
    const likesRef = collection(db, "likes");
    const q = query(likesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const userLikes: string[] = [];
    querySnapshot.forEach((doc) => {
      userLikes.push(doc.data().tweetId);
    });

    return userLikes;
  } catch (error) {
    console.error("Erro ao obter os likes do usuário: ", error);
    return [];
  }
}

export async function getTweetLikes(tweetId: string): Promise<number> {
  try {
    const likesRef = collection(db, "likes");
    const q = query(likesRef, where("tweetId", "==", tweetId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting tweet likes: ", error);
    return 0;
  }
}

export async function addRetweet( tweetId: string, userId: string ): Promise<void> {
  try {
    const retweetsRef = collection(db, "retweets");
    const retweetQuery = query(
      retweetsRef,
      where("tweetId", "==", tweetId),
      where("userId", "==", userId)
    );
    const retweetQuerySnapshot = await getDocs(retweetQuery);
    if (retweetQuerySnapshot.empty) {
      await addDoc(collection(db, "retweets"), {
        tweetId,
        userId,
      });

      const tweetRef = doc(db, "tweets", tweetId);
      const tweetDoc = await getDoc(tweetRef);

      if (tweetDoc.exists()) {
        const currentRetweets = tweetDoc.data().retweets || 0;
        await setDoc(
          tweetRef,
          { retweets: currentRetweets + 1 },
          { merge: true }
        );
      }
      const retweetCountRef = doc(db, "retweetsCount", tweetId);
      const retweetCountDoc = await getDoc(retweetCountRef);

      if (retweetCountDoc.exists()) {
        const currentCount = retweetCountDoc.data().count || 0;
        await setDoc(
          retweetCountRef,
          { count: currentCount + 1 },
          { merge: true }
        );
      } else {
        await setDoc(retweetCountRef, { count: 1 });
      }
      console.log("Retweet adicionado com sucesso.");
    }
  } catch (error) {
    console.error("Erro ao adicionar retweet: ", error);
  }
}

export async function removeRetweet( tweetId: string, userId: string ): Promise<void> {
  try {
    const retweetsRef = collection(db, "retweets");
    const retweetQuery = query(
      retweetsRef,
      where("tweetId", "==", tweetId),
      where("userId", "==", userId)
    );
    const retweetQuerySnapshot = await getDocs(retweetQuery);

    if (!retweetQuerySnapshot.empty) {
      retweetQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      const tweetRef = doc(db, "tweets", tweetId);
      const tweetDoc = await getDoc(tweetRef);

      if (tweetDoc.exists()) {
        const currentRetweets = tweetDoc.data().retweets || 0;
        await setDoc(
          tweetRef,
          { retweets: currentRetweets - 1 },
          { merge: true }
        );
      }
      const retweetCountRef = doc(db, "retweetsCount", tweetId);
      const retweetCountDoc = await getDoc(retweetCountRef);

      if (retweetCountDoc.exists()) {
        const currentCount = retweetCountDoc.data().count || 0;
        if (currentCount > 1) {
          await setDoc(
            retweetCountRef,
            { count: currentCount - 1 },
            { merge: true }
          );
        } else {
          await deleteDoc(retweetCountRef);
        }
      }

      console.log("Retweet removido com sucesso.");
    }
  } catch (error) {
    console.error("Erro ao remover retweet: ", error);
  }
}

export async function getTweetRetweets(tweetId: string): Promise<number> {
  try {
    const retweetCountRef = doc(db, "retweetsCount", tweetId);
    const retweetCountDoc = await getDoc(retweetCountRef);

    if (retweetCountDoc.exists()) {
      return retweetCountDoc.data().count || 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Erro ao obter a contagem de retweets do tweet: ", error);
    return 0;
  }
}

export async function getUserRetweets(userId: string): Promise<string[]> {
  try {
    const userRetweetsRef = collection(db, "userRetweets");
    const querySnapshot = await getDocs(
      query(userRetweetsRef, where("userId", "==", userId))
    );

    const userRetweets: string[] = [];

    querySnapshot.forEach((doc) => {
      userRetweets.push(doc.data().tweetId);
    });

    return userRetweets;
  } catch (error) {
    console.error("Erro ao obter os retweets do usuário: ", error);
    return [];
  }
}

export async function deleteTweet(tweetId: string, setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>): Promise<void> {
  try {
    const tweetRef = doc(db, "tweets", tweetId);
    await deleteDoc(tweetRef);

    // Aguarde a exclusão bem-sucedida antes de atualizar o estado
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adicione um pequeno atraso (1 segundo) como precaução
    console.log("Tweet excluído com sucesso.");

    // Atualize o estado local removendo o tweet excluído
    setTweets((prevTweets: Tweet[]) => prevTweets.filter((tweet: Tweet) => tweet.id !== tweetId));
  } catch (error) {
    console.error("Erro ao excluir tweet: ", error);
  }
}