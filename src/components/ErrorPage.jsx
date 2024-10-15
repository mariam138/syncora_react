import { useRouteError } from "react-router-dom";
import styles from "../App.module.css";

function ErrorPage() {
  // Code to create the error page component is adapted from the react router docs
  // https://reactrouter.com/en/main/start/tutorial#handling-not-found-errors

  const error = useRouteError();
  console.log(error);
  return (
    <div className={styles.App}>
      <h1>Error Page</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorPage;
