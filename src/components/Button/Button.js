import styles from './Button.module.scss';

function Button({ onClick }) {
  console.log('button');
  return <button className={styles.Button} type="button" onClick={onClick}></button>;
}

export default Button;
