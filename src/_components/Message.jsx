import React, { memo } from "react";

const Message = ({ item, user }) => {
    const { uid, photoUrl, text, displayName } = item;

    return (
        <div className={`message ${user.uid === uid ? "message_user" : ""}`}>
            <div className="message__avatar-ibg">
                <img src={photoUrl} alt={displayName} />
            </div>
            <div className="message__body">
                <div className="message__label">{displayName}</div>
                <p className="message__text">{text}</p>
            </div>
        </div>
    );
};

export default memo(Message);
