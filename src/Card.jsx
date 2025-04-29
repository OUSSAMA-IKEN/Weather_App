import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchWeather } from "./Slices/weatherAppSlice";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/min/locales";

/**
 * to ensure that the moment library is working correctly  :
 * 1- import moment from "moment";
 * 2- import "moment/min/locales"; => contains all the locales (languages)
 * 3- moment.locale("en"); => set the language to english
 * @returns
 */

export default function BasicCard() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.weatherApp.loading);
  const error = useSelector((state) => state.weatherApp.error);
  const weather = useSelector((state) => {
    return state.weatherApp.weatherState;
  });

  //states for weather data
  const [language, setLanguage] = useState("en");
  const [timeAndDate, setTimeAndDate] = useState(null);

  // update the time and date every second
  useEffect(() => {
    moment.locale(language);
    i18n.changeLanguage(language);
    const interval = setInterval(() => {
      setTimeAndDate(moment().format("MMMM Do YYYY,   h:mm a"));
    }, 1000);
    return () => clearInterval(interval);
  }, [language, i18n]);

  //fetching weather data
  useEffect(() => {
    dispatch(fetchWeather());
  }, []);
  return (
    <>
       <div>{error}</div>
      <Card
        className="card"
        sx={{
          background: "transparent",
          backdropFilter: "blur(10px)",
          width: "96%",
          height: "93%",
          borderRadius: "15px",
          padding: "11px",
          boxShadow: "0 0 20px 0 rgba(255, 239, 239, 0.64)"
        }}
      >
        <Grid
          container
          spacing={2}
          direction={"column"}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <Grid xs={12} sx={{ display: "flex", gap: "40px" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ textAlign: "start", color: "white", fontSize: "40px" }}
            >
              {t(weather.name)}
            </Typography>
            <Typography
              variant="h7"
              component="div"
              sx={{
                textAlign: "start",
                color: "white",
                fontSize: "20px",
                marginTop: "17px"
              }}
            >
              {timeAndDate}
            </Typography>
          </Grid>
          <hr style={{ color: "white", width: "95%" }} />
          <Grid xs={12} sx={{ marginTop: "-10px", marginBottom: "-15px" }}>
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* left side */}
              <div
                style={{
                  color: "white",
                  width: "40%",
                  display: "flex",
                  justifyContent: "start"
                }}
              >
                {/* <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt="weather icon"
                /> */}
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="weather icon"
                  style={{
                    width: "170px",
                    height: "170px"
                  }}
                />
              </div>
              {/* end of left side */}

              {/* right side */}
              <div
                style={{
                  color: "white",
                  width: "40%"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="weather icon"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <Typography
                    variant="h1"
                    component="div"
                    width={"100%"}
                    sx={{ textAlign: "right", fontSize: "69px" }}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: "white" }} />
                    ) : (
                      <span>{t(weather.temp)}°C</span>
                    )}
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  component="div"
                  width={"97%"}
                  sx={{ textAlign: "right" }}
                >
                  <span>{t(weather.weatherDescription)}</span>
                </Typography>
                <Typography
                  variant="h7"
                  component="div"
                  sx={{
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "97%",
                    marginTop: "10px"
                  }}
                >
                  <span>
                    {t("max")} {weather.tempMax}
                  </span>
                  <span>|</span>
                  <span>
                    {t("min")} {weather.tempMin}
                  </span>
                </Typography>
              </div>
              {/* end of right side */}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <CardActions>
        <Button
          size="small"
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          sx={{ backgroundColor: "none", color: "whitesmoke" }}
        >
          {language === "en" ? "Arabic" : "English"}
        </Button>
      </CardActions>
    </>
  );
}
