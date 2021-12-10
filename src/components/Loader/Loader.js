import Loader from 'react-loader-spinner';

import styles from './Loader.module.scss';

function Spinner() {
  return (
    <>
      <Loader type="Circles" color="#00BFFF" height={60} width={60} />
      <h2 className={styles.text}>Loading...</h2>
    </>
  );
}

export default Spinner;
