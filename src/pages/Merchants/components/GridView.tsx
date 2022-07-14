import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import UserStockItem from "../../../components/Card/UserStockItem";
import { IStock } from "../../../types/StockTypes";
import { Groups } from "../../../constants/Groups";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RootState } from "../../../redux/store";

const GridView = () => {
  const [expanded, setExpanded] = useState<string | false>(Groups[0].name);

  const handleChangePanel =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const products = useSelector((state: RootState) => state.products.list);

  return (
    <Box sx={{ width: '100%' }}>
      {Groups.map((group) => (
        <Accordion expanded={expanded === group.name} onChange={handleChangePanel(group.name)} sx={{ marginBottom: 2 }} key={group.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>
            {group.name}
            </Typography>                  
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}>
              {products.slice(4, products.length + 1).filter((stock) => stock.group === group.id).map((stock: IStock) => (
                <Grid item xs={12} sm={4} md={4} key={stock.id}>
                  <UserStockItem stock={stock} />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>    
  );
};

export default GridView;
