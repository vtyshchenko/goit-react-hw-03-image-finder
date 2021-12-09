import styles from './Button.module.scss';

function Button({ onClick }) {
  return <button className={styles.Button} type="button" onClick={onClick}></button>;
}

export default Button;
