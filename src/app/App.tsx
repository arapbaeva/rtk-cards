import { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.me());
  }, [dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(appActions.setIsLoading({ isLoading: false }));
  //   }, 3000);
  // }, []);

  return <div className="App">{isLoading && <LinearProgress />}</div>;
}

export default App;
