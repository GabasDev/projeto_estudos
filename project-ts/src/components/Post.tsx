import { FormEvent, useState, ChangeEvent, InvalidEvent } from "react";
import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["Massa, muito bacana meu brother!"]);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentError, setCommentError] = useState(""); // Estado para erro

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    if (newCommentText.trim() === "") {
      setCommentError("⚠️ O comentário não pode estar vazio!");
      return;
    }

    setComments([...comments, newCommentText]);
    setNewCommentText("");
    setCommentError(""); // Resetando erro após um envio válido
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
    if (event.target.value.trim() !== "") {
      setCommentError(""); // Remove o erro quando o usuário começa a digitar
    }
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== commentToDelete
    );
    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time>1 hora atrás</time>
      </header>

      <div className={styles.content}>
        {post.content.map((item, index) => {
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
          onInvalid={handleNewCommentInvalid}
          required
        />
        
        {/* Mostra o erro apenas se houver */}
        {commentError && <p className={styles.error}>{commentError}</p>}

        <footer>
          <button type="submit" disabled={newCommentText.length === 0}>
            Publicar
          </button>
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
