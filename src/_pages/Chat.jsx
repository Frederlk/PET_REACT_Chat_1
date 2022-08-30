import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "..";
import Loader from "../_components/Loader";
import { collection, addDoc, Timestamp, orderBy, onSnapshot, query } from "firebase/firestore";

const sortData = (a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
};

const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [messages, loading] = useCollectionData(collection(firestore, "messages"));
    const [value, setValue] = useState("");
    const [sortedMessages, setSortedMessages] = useState([]);

    useEffect(() => {
        onSnapshot(query(collection(firestore, "messages"), orderBy("createdAt")), (snapshot) => {
            setSortedMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);

    const sendMessage = async () => {
        addDoc(collection(firestore, "messages"), {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            text: value,
            createdAt: Timestamp.now(),
        });
        setValue("");
    };

    if (loading) return <Loader />;

    return (
        <section className="chat">
            <div className="chat__container">
                <h2 className="chat__title">Chat</h2>
                <div className="chat__body">
                    {sortedMessages.length ? (
                        sortedMessages.map(({ uid, photoUrl, text, displayName, createdAt }, i) => (
                            <div key={uid + i} className={`message ${user.uid === uid ? "message_user" : ""}`}>
                                <div className="message__avatar-ibg">
                                    <img src={photoUrl} alt={displayName} />
                                </div>
                                <div className="message__body">
                                    <div className="message__label">{displayName}</div>
                                    <p className="message__text">{text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-message">There is no massages for now...</div>
                    )}
                </div>
                <div className="chat__actions">
                    <textarea
                        autoComplete="off"
                        type="text"
                        name="message"
                        placeholder="Write a message..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="chat__input input"
                    />
                    <button type="button" onClick={value.length ? sendMessage : null} className="chat__btn btn">
                        Send
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Chat;
