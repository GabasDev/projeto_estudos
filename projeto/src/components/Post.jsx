import { useState } from "react";
import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState([
    "Massa, muito bacana meu brother!",
  ]);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentError, setCommentError] = useState(""); // Estado para erro

  function handleCreateNewComment(event) {
    event.preventDefault();

    if (newCommentText.trim() === "") {
      setCommentError("⚠️ O comentário não pode estar vazio!");
      return;
    }

    setComments([...comments, newCommentText]);
    setNewCommentText("");
    setCommentError(""); // Resetando erro após um envio válido
  }

  function handleNewCommentChange(event) {
    setNewCommentText(event.target.value);
    if (event.target.value.trim() !== "") {
      setCommentError(""); // Remove o erro quando o usuário começa a digitar
    }
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== commentToDelete
    );
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time>1 hora atrás</time>
      </header>

      <div className={styles.content}>
        {content.map((item, index) => {
          if (item.type === "paragraph") {
            return <p key={index}>{item.content}</p>;
          } else if (item.type === "link") {
            return (
              <p key={index}>
                <a href="#">{item.content}</a>
              </p>
            );
          }
          return null;
        })}
      </div>

      {/* Formulário */}
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />
        
        {/* Mostra o erro apenas se houver */}
        {commentError && <p className={styles.error}>{commentError}</p>}

        <footer>
          <button type="submit" disabled={newCommentText.length == 0}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            content={comment}
            ondeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
