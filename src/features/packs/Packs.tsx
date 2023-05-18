import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useEffect } from "react";
import { packsThunks } from "features/packs/packs.slice";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Filter } from "common/components/filter/Filter";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const id = useAppSelector((state) => state.auth.profile?._id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(packsThunks.getPacks({ user_id: id ? id : "" }));
  }, []);

  return (
    <div style={{ overflowY: "auto", marginTop: "200px", marginLeft: "100px", marginRight: "100px" }}>
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
            {packs.map((pack) => (
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
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
