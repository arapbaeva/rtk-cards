import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { appActions } from "app/app.slice";
import { authThunks } from "features/auth/auth.slice";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authThunks.me());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, []);

  return <div className="App">{isLoading && <h1>Loader...</h1>}</div>;
}

export default App;
