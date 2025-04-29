import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  //states for weather data
  const [language, setLanguage] = useState("en");
  const [temp, setTemp] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [city, setCity] = useState(null);
  const [weatherDescription, setweatherDescription] = useState(null);
  const [icon, setIcon] = useState(null);
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
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=32.00426200&lon=-6.57833870&appid=036acb124944680e8aedda84f4dad91a"
      )
      .then((response) => {
        let temp = Math.round(response.data.main.temp - 273.15);
        setTemp(temp);
        setCity(response.data.name);
        setTempMax(Math.round(response.data.main.temp_max - 273.15));
        setTempMin(Math.round(response.data.main.temp_min - 273.15));
        setweatherDescription(response.data.weather[0].description);
        setIcon(response.data.weather[0].icon);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);
  return (
    <div style={{}}>
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
              {t(city)}
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
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
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
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="weather icon"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <Typography
                    variant="h1"
                    component="div"
                    width={"100%"}
                    sx={{ textAlign: "right", fontSize: "69px" }}
                  >
                    <span>{temp}°C</span>
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  component="div"
                  width={"97%"}
                  sx={{ textAlign: "right" }}
                >
                  <span>{t(weatherDescription)}</span>
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
                    {t("max")} {tempMax}
                  </span>
                  <span>|</span>
                  <span>
                    {t("min")} {tempMin}
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
    </div>
  );
}
