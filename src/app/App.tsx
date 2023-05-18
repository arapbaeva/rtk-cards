import React, { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { LinearProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Header } from "common/components/Header/Header";
import { Filter } from "common/components/filter/Filter";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.me());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading && <LinearProgress />}
      <Header />
      {/*<Filter />*/}
    </div>
  );
}

export default App;
