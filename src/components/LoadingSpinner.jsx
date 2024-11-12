import Spinner from "react-bootstrap/Spinner";
import styles from '../styles/Spinner.module.css'

function LoadingSpinner() {
  return (
    <div className="text-center my-2">
      <Spinner animation="border" role="status" className={`fs-5 ${styles.Spinner}`}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
