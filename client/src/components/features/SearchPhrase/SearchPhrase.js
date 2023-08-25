import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SearchPhrase.module.scss';

const SearchPhrase = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/ad/search/${searchPhrase}`);
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate className={style.container}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              onChange={(event) => setSearchPhrase(event.target.value)}
              margin="normal"
              required
              fullWidth
              label="Search field"
              autoComplete="searchField"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <Button className={style.button} type="submit" fullWidth variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchPhrase;
