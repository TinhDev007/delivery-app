import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Box, Typography, ToggleButtonGroup, ToggleButton, Button, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { List, GridView } from '@mui/icons-material';
import MerchantCard from "../../components/Card/Merchant";
import { IMerchant } from "../../types/MerchantTypes";
import TableView from "./components/Table";
import MerchantForm from "./components/MerchantForm";
import { RootState } from "../../redux/store";

const MerchantListPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewMode, setViewMode] = useState("list");
  const [createMerchantModal, setCreateMerchantModal] = useState(false);
  const userRole = localStorage.getItem("role");

  const merchants = useSelector((state: RootState) => state.merchants.list);

  const handleCloseModal = () => {
    setCreateMerchantModal(false);
  };

  return (
    <>
      <Box>
        <Container sx={{ paddingY: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: `${matches ? 'column' : 'row'}` }}>
            <Typography variant="h3" sx={{ marginY: 5 }}>
              All Stores
            </Typography>
            {userRole === 'admin' && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: `${matches ? '20px' : 0}` }}>
                <Button variant="contained" sx={{ marginRight: 2 }} onClick={() => setCreateMerchantModal(true)}>Create</Button>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(event, viewMode) => setViewMode(viewMode)}
                  aria-label="view mode"
                >
                  <ToggleButton value="tile" aria-label="tile view">
                    <List />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list view">
                    <GridView />
                  </ToggleButton>            
                </ToggleButtonGroup>
              </Box>
            )}
          </Box>
          {viewMode === 'list' ? (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}>
              {merchants.map((merchant: IMerchant) => (
                <Grid item xs={6} sm={6} md={2} key={merchant.id}>
                  <MerchantCard merchant={merchant} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid>
              <TableView />
            </Grid>
          )} 
          
        </Container>
      </Box>
      {createMerchantModal &&
        <MerchantForm
          open={createMerchantModal}
          mode="Create"
          closeModal={() => handleCloseModal()}
        />
      }
    </>
  );
};

export default MerchantListPage;
