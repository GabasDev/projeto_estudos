import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { Trash, ThumbsUp } from 'phosphor-react';

interface CommentProps {
  content: string;
  ondeleteComment:(comment: string) => void
}


export function Comment({content, ondeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);
  function handleDeleteComment(){
    console.log('deletar')

    ondeleteComment(content)
  }

  function handleLikeComment(){
    setLikeCount((state)=>{
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false}
       src="https://github.com/bnerTT.png"
        alt="Avatar" 
        />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Abner Gama</strong>
              <time title="03 de março às 15:23" dateTime="2025-03-03T08:13:30">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p> {content} </p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
