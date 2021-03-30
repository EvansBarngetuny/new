const LikeCounter = ({likesCount, text}) => {
    text = text && 'like';
    return (
        <span className="like-counter">
            <strong>{likesCount} {text + (likesCount === 1 ? '' : 's')}</strong>

            <style jsx="true">{`
              .like-counter {
                margin-left: 10px;
              }
            `}
            </style>
        </span>
    );
}

export default LikeCounter;