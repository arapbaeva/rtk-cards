import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { Counter } from "features/counter/Counter";
import { appActions } from "app/app.slice";
import { SignUp } from "features/auth/sign-up/SignUp";
import { SignIn } from "features/auth/sign-in/SignIn";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>Loader...</h1>}
      <SignUp />
      <SignIn />
      <Counter />
    </div>
  );
}

export default App;
