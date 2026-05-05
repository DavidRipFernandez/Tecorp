import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { CreateCommentDto } from '../../types/comment.types';
import { extractApiError } from '../../api/client';
import styles from './comments.module.css';

interface CommentFormProps {
  onSubmit: (dto: CreateCommentDto) => Promise<void>;
}

const MAX_CONTENT = 1000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(val && !EMAIL_REGEX.test(val) ? 'Formato de email inválido' : null);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CONTENT) {
      setContent(e.target.value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !content.trim()) {
      setError('Todos los campos son requeridos.');
      return;
    }
    if (emailError) {
      setError('Por favor corrige el email antes de continuar.');
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await onSubmit({ username: username.trim(), email: email.trim(), content: content.trim() });
      setUsername('');
      setEmail('');
      setContent('');
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.formTitle}>Agregar comentario</h3>

      {error && <p className={styles.errorMsg}>{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="comment-username">
          Usuario
        </label>
        <input
          id="comment-username"
          className={styles.input}
          type="text"
          placeholder="@username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="comment-email">
          Email
        </label>
        <input
          id="comment-email"
          className={styles.input}
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={handleEmailChange}
          disabled={submitting}
        />
        {emailError && <span className={styles.fieldError}>{emailError}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="comment-content">
          Comentario
        </label>
        <textarea
          id="comment-content"
          className={styles.textarea}
          placeholder="Escribe tu comentario..."
          value={content}
          onChange={handleContentChange}
          disabled={submitting}
          rows={3}
        />
        <span className={`${styles.charCount} ${content.length >= MAX_CONTENT ? styles.charCountMax : ''}`}>
          {content.length}/{MAX_CONTENT}
        </span>
      </div>

      <button
        className={styles.button}
        type="submit"
        disabled={submitting || !!emailError}
      >
        {submitting ? 'Enviando...' : 'Comentar'}
      </button>
    </form>
  );
};
