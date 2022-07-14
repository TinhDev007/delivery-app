import { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Grid } from "@mui/material";

// Import Components
import CategorySlides from "../components/Slides/CategorySlides";
import MerchantCard from "../components/Card/Merchant";

// Import Types
import { IMerchant } from "../types/MerchantTypes";
import { ICategory } from "../types/CategoryTypes";

// Import Actions
import { getMerchantsRequest } from "../redux/reducer/merchantsReducer";

import type { RootState } from '../redux/store';


const HomePage = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [selectedMerchants, setSelectedMerchants] = useState<IMerchant[]>([]);

  const merchants = useSelector((state: RootState) => state.merchants.list);

  const handleSelectCategory = (category: ICategory | undefined) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if(selectedCategory) {
      setSelectedMerchants(merchants.filter((merchant) => merchant.category === selectedCategory?.name));
    } else {
      setSelectedMerchants(merchants);
    }
  }, [merchants, selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getMerchantsRequest());
    };
  
    fetchData();
  }, [dispatch]);

  return (
    <Container sx={{ paddingY: 8 }}>
      <CategorySlides selectedCategory={selectedCategory} handleSelectCategory={handleSelectCategory}/>
      <Typography variant="h3" gutterBottom component="div" sx={{ margin: 5 }}>
        All Stores
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}>
        {selectedMerchants.map((merchant: IMerchant) => (
          <Grid item xs={6} sm={4} md={2} key={merchant.id}>
            <MerchantCard merchant={merchant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
