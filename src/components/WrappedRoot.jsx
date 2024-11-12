import { CurrentUserProvider } from "../contexts/CurrentUserContext";
import Root from "../routes/Root";

const WrappedRoot = () => {
  return (
    <CurrentUserProvider>
      <Root />
    </CurrentUserProvider>
  );
};

export default WrappedRoot;
