import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPhrase = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/ad/search/${searchPhrase}`);
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              onChange={(event) => setSearchPhrase(event.target.value)}
              margin="normal"
              required
              fullWidth
              id="search"
              label="Search field"
              name="searchField"
              autoComplete="searchField"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained" sx={{ height: '100%' }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchPhrase;
