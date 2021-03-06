import { Divider, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtonGroup from "../../app/components/CheckboxButtonGroup";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions =
  [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to Low' },
    { value: 'price', label: 'Price - Low to High' },
  ];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (!filtersLoaded)
    return <LoadingComponent message='Loading products...' />;

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Paper variant='outlined' sx={{ mb: 2.2 }} elevation={0}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ pt: 1, pb: 2 }} elevation={0} variant='outlined'>
            <Grid sx={{ fontWeight: '500', mt: 2, ml: 3 }}>
              Sort by
            </Grid>
            <Grid sx={{ ml: 3, mt: 1 }} >
              <RadioButtonGroup
                selectedValue={productParams.sortBy}
                options={sortOptions}
                onChange={(event) => dispatch(setProductParams({ sortBy: event.target.value }))}
              />
            </Grid>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Grid sx={{ mt: 3, ml: 3, mb: 2 }} >
              <Grid sx={{ fontWeight: '500' }}>
                Brand
              </Grid>
              <CheckboxButtonGroup
                items={brands}
                checked={productParams.brands}
                onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
              />
            </Grid>
            <Grid sx={{ ml: 3 }} >
              <Grid sx={{ fontWeight: '500' }}>
                Type
              </Grid>
              <CheckboxButtonGroup
                items={types}
                checked={productParams.types}
                onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9} sx={{ pb: 5 }}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9} sx={{ pb: 5 }}>
          {metaData &&
            <AppPagination
              metaData={metaData}
              onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
            />
          }
        </Grid>
      </Grid>
    </>
  )
}