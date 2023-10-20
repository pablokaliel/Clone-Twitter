import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
