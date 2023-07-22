import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from "@mui/material";
import WeatherIconComponent from "./WeatherIconComponent";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

import {
  fetchBerlinHistoricalData,
  selectBerlinHistoricalData,
} from "../redux/BerlinHistoricalWeatherSlice.jsx";
import "./Loader.css";

const BerlinHistoricalData = () => {
  const dispatch = useDispatch();
  const berlinHistoricalData = useSelector(selectBerlinHistoricalData);
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  useEffect(() => {
    if (!berlinHistoricalData) {
      dispatch(fetchBerlinHistoricalData());
    }
  }, [dispatch, berlinHistoricalData]);

  const fetchHistoricalData = () => {
    dispatch(fetchBerlinHistoricalData());
  };

  if (!berlinHistoricalData || !berlinHistoricalData.daily) {
    return (
      <div>
        <Button onClick={fetchHistoricalData}>
          <div className="lds-dual-ring"></div>
        </Button>
      </div>
    );
  }

  const { daily } = berlinHistoricalData;

  const handleCardToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <Button variant="outlined">
        <Link to="/berlin">Berlin current weather </Link>
        <ReplyAllIcon fontSize="small" />
      </Button>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h3">Historical data per date</Typography>
          <Typography variant="h5">
            The table below is showing data that dates a year back, click on any
            row and it opens up more info about it.
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Max Temperature (°C)</TableCell>
                  <TableCell>Min Temperature (°C)</TableCell>
                  <TableCell>Precipitation (mm)</TableCell>
                  <TableCell>Wind Direction (°)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {daily.time.map((date, index) => (
                  <React.Fragment key={index}>
                    <TableRow
                      hover
                      onClick={() => handleCardToggle(index)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{date}</TableCell>
                      <TableCell>{daily.temperature_2m_max[index]}</TableCell>
                      <TableCell>{daily.temperature_2m_min[index]}</TableCell>
                      <TableCell>{daily.precipitation_sum[index]}</TableCell>
                      <TableCell>
                        {daily.winddirection_10m_dominant[index]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Collapse in={expandedIndex === index}>
                          <Card>
                            <CardContent>
                              <Typography variant="h5">
                                <div className="iconContainer">
                                  <WeatherIconComponent
                                    code={daily.weathercode[index]}
                                  />
                                </div>
                              </Typography>
                              <Typography variant="body1">
                                Max Temperature:{" "}
                                {daily.temperature_2m_max[index]} °C
                              </Typography>
                              <Typography variant="body1">
                                Min Temperature:{" "}
                                {daily.temperature_2m_min[index]} °C
                              </Typography>
                              <Typography variant="body1">
                                Precipitation: {daily.precipitation_sum[index]}{" "}
                                mm
                              </Typography>
                              <Typography variant="body1">
                                Rainfall: {daily.rain_sum[index]} mm
                              </Typography>
                              <Typography variant="body1">
                                Snowfall: {daily.snowfall_sum[index]} cm
                              </Typography>
                              <Typography variant="body1">
                                Precipitation Hours:{" "}
                                {daily.precipitation_hours[index]} h
                              </Typography>
                              <Typography variant="body1">
                                Wind Direction:{" "}
                                {daily.winddirection_10m_dominant[index]} °
                              </Typography>
                            </CardContent>
                          </Card>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default BerlinHistoricalData;