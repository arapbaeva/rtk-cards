import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Filter } from "common/components/filter/Filter";
import Button from "@mui/material/Button";
import { UniversalModal } from "common/modal/UniversalModal";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const id = useAppSelector((state) => state.auth.profile?._id);
  const packName = useAppSelector((state) => state.packs.packName);
  const deckCover = useAppSelector((state) => state.packs.deckCover);
  const packId = useAppSelector((state) => state.packs.packId);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    dispatch(packsThunks.getPacks({ user_id: id ? id : "", packName }));
  }, [packName]);
  const [value, setValue] = useState("");

  const addNewPackHandler = (name: string, deckCover: string) => {
    dispatch(packsThunks.createPacks({ name, deckCover }));
    setValue("");
    setOpen(false);
  };

  const deletePackHandler = (packId: string) => {
    dispatch(packsThunks.deletePacks(packId));
    dispatch(packsThunks.getPacks({ user_id: id ? id : "", packName }));
  };
  return (
    <div style={{ overflowY: "auto", marginTop: "200px", marginLeft: "100px", marginRight: "100px" }}>
      <UniversalModal title={"Add new pack"} setOpen={setOpen} open={open}>
        <Button>Add new pack</Button>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
            id="standard-basic"
            label="Name Pack"
            variant="standard"
            value={value}
            type={"text"}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </Box>
        {/*<input value={value} type={"text"} onChange={(e) => setValue(e.currentTarget.value)} />*/}
        <Button onClick={() => addNewPackHandler(value, deckCover)}>Add New Pack</Button>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Private pack" />
      </UniversalModal>
      <Filter />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Cards</b>
              </TableCell>
              <TableCell align="right">
                <b>Last Updated</b>
              </TableCell>
              <TableCell align="right">
                <b>Created by</b>
              </TableCell>
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs && packs.length ? (
              packs.map((pack) => (
                <TableRow key={pack.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {pack.name}
                  </TableCell>
                  <TableCell align="right">{pack.cardsCount}</TableCell>
                  <TableCell align="right">{new Date(pack.updated).toLocaleDateString("ua")}</TableCell>
                  <TableCell align="right">{pack.user_name}</TableCell>
                  <TableCell align="right">
                    <SchoolIcon />
                    <EditIcon />
                    <DeleteIcon onClick={() => deletePackHandler(pack._id)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div>Nothing found</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
