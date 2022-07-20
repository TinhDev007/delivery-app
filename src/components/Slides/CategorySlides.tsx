import React, { useState, useEffect, useCallback } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Avatar, Typography, useTheme } from "@mui/material";
// import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import "./styles.css";

import { ICategory } from "../../types/CategoryTypes";
import { getAllCategories } from "../../actions/categoryActions";

import type { RootState } from '../../redux/store';

interface IProps {
  selectedCategory: ICategory | undefined,
  handleSelectCategory: (category: ICategory | undefined) => void
};

const CategorySlides = (props: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const theme = useTheme();
  const { selectedCategory, handleSelectCategory } = props;
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    // containScroll: "trimSnaps",
    loop: true
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const categories = useSelector((state: RootState) => state.categories.list);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  const showStoresForCategory = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, category: ICategory) => {
    localStorage.setItem("category", category.name);
    handleSelectCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCategories());
    };
  
    fetchData();
  }, [dispatch]);


  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">        
          {categories.map((category: ICategory) => (
            <div className="embla__slide" key={category.id} onClick={(event) => showStoresForCategory(event, category)}>
              <div className="embla__slide__inner">
                <Card 
                  sx={{ 
                    boxShadow: 3,
                    backgroundColor: `${category.id === selectedCategory?.id ? theme.palette.secondary.dark : 'white' }`,
                    color: `${category.id === selectedCategory?.id ? '#fff' : '#000' }`,
                    borderRadius: 8
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar aria-label="recipe" sx={{ width: 70, height: 70, margin: '0 auto' }}>
                      <img src={category.image} alt="" />
                    </Avatar>
                    <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 3, textTransform: 'capitalize' }}>
                      {category.name}
                    </Typography>                    
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
    </div>
  );
};

export default CategorySlides;
