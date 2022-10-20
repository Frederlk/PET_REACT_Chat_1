import React, { useContext, useEffect, useRef, useMemo, useCallback } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "..";
import Loader from "../_components/Loader";
import Message from "../_components/Message";
import { collection, addDoc, Timestamp, orderBy, onSnapshot, query } from "firebase/firestore";

const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [messages, loading] = useCollectionData(collection(firestore, "messages"));
    const [value, setValue] = useState("");
    const [sortedMessages, setSortedMessages] = useState([]);
    const bodyRef = useRef(null);

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
            text: value.trim(),
            createdAt: Timestamp.now(),
        });
        setValue("");
    };

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [sortedMessages]);

    const handleTextarea = useCallback(
        (e) => {
            const keyCode = e.which || e.keyCode;
            if (keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                console.log(value);
                value.trim().length ? sendMessage() : null;
            }
        },
        [value]
    );

    const memoMessages = useMemo(() => {
        if (sortedMessages.length) {
            return sortedMessages.map((item, i) => <Message key={item.uid + i} item={item} user={user} />);
        } else {
            return <div className="no-message">There is no massages for now...</div>;
        }
    }, [sortedMessages]);

    if (loading) return <Loader />;

    return (
        <section className="chat">
            <div data-fullscreen="" className="chat__container">
                <div ref={bodyRef} className="chat__body">
                    {memoMessages}
                </div>
                <div className="chat__actions">
                    <textarea
                        autoComplete="off"
                        type="text"
                        name="message"
                        placeholder="Write a message..."
                        onKeyDown={(e) => handleTextarea(e)}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="chat__input input"
                    />
                    <button
                        type="button"
                        onClick={value.trim().length ? sendMessage : null}
                        className="chat__btn btn"
                    >
                        Send
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Chat;
