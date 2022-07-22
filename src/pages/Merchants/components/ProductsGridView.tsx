import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import UserStockItem from "../../../components/Card/UserStockItem";
import { IStock } from "../../../types/StockTypes";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RootState } from "../../../redux/store";
import { getAllProductGroups } from "../../../actions/productActions";

const ProductsGridView = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const groups = useSelector((state: RootState) => state.products.productGroups).filter((group) => group.merchantid === id);
  const [expanded, setExpanded] = useState<string | false>(groups[0]?.name);  

  useEffect(() => {
    dispatch(getAllProductGroups());
  }, [dispatch]);

  const handleChangePanel =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const products = useSelector((state: RootState) => state.products.list).filter((item) => item.merchantid?.toString() === id);

  return (
    <Box sx={{ width: '100%' }}>
      {groups.map((group) => (
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
              {products.filter((stock) => stock.prod_group === group.id).map((stock: IStock) => (
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

export default ProductsGridView;
