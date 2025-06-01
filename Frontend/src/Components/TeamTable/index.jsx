import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(rank, name, score) {
  return { rank, name, score };
}

const rows = [
  createData(1, "Doaa ", 100),
  createData(2, "Jamella ", 70),
  createData(3, "Abdelrahman", 50),
  createData(4, "Kareem", 20),
];

export default function TeamTable({ calculateTotalScore }) {
  const totalScore = rows.reduce((acc, row) => acc + row.score, 0);

  calculateTotalScore(totalScore);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Score</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.rank}>
              <StyledTableCell>{row.rank}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={row.avatar}
                    alt={row.name}
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: "#8a2be2",
                      color: "white",
                    }}
                  />
                  {row.name}
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>{" "}
      </Table>
    </TableContainer>
  );
}
