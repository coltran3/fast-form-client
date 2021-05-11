import { Grid, Paper, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import styled from "styled-components";

export function Users() {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Criar usuario WIP
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel id="role-input">Função</InputLabel>
            <Select labelId="role-input" id="role-input" label="Função">
              <MenuItem value={10}>TenTenTenTenTenTenTenTenTenTen</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
