import { CurrentUserProvider } from "../contexts/CurrentUserContext";
import Root from "../routes/Root.jsx";

/** Wraps the Root element with the CurrentUserProvider
 * ensuring context is available to all components in the app.
 * This also allows the useNavigate hook to be available to use
 * in the CurrentUserContext. The WrappedRoot element is then set
 * as the main element for the /* path.
 */
const WrappedRoot = () => {
  return (
    <CurrentUserProvider>
      <Root />
    </CurrentUserProvider>
  );
};

export default WrappedRoot;
