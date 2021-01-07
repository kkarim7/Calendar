import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

import classes from "./Calendar.module.css";

const Calendar: React.FC = () => {

  const [currentDay, setCurrentDay] = useState<string>(
    new Date().toLocaleDateString()
  );

  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );

  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const nextMonthClickHandler = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      return;
    }
    setCurrentMonth(currentMonth + 1);
  };

  const previousMonthClickHandler = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      return;
    }
    setCurrentMonth(currentMonth - 1);
  };

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  let monthPresented = months[currentMonth];

  let daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let loop = daysOfTheWeek.map((day) => {
    return (
      <IonCol key={day} className="ion-text-center">
        {day}
      </IonCol>
    );
  });

  let lastDayOfThePreviousMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).toDateString();

  let lastDayOfThePreviousMonthNumber = daysOfTheWeek.indexOf(
    lastDayOfThePreviousMonth.slice(0, 3)
  );

  let previousMonthDays = [];

  for (let i = lastDayOfThePreviousMonthNumber; i >= 0 && i < 6; i--) {
    previousMonthDays.push(
      <IonCol key={"Previous" + i}>
        <div className={`${classes.NextMonth} ion-text-center`}>
          {+lastDayOfThePreviousMonth.slice(8, 10) - i}
        </div>
      </IonCol>
    );
  }

  let daysInTheMonth = [];

  for (let i = 1; i <= parseInt(lastDayOfMonth.toJSON().slice(8, 10)); i++) {
    let currentDayHighlighted;
    if (
      currentMonth === +currentDay.slice(0, 1) - 1 ||
      currentMonth === +currentDay.slice(0, 2) - 1
    ) {
      if (i < 10) {
        currentDayHighlighted =
          currentDay.slice(0, 2) + i + currentDay.slice(3) === currentDay
            ? classes.CurrentDay
            : "";
      } else {
        currentDayHighlighted =
          currentDay.slice(0, 2) + i + currentDay.slice(4) === currentDay
            ? classes.CurrentDay
            : "";
      }
    }

    daysInTheMonth.push(
      <IonCol key={currentMonth + "/" + i}>
        <div
          className={`${currentDayHighlighted} ${classes.Pointer} ion-text-center`}
        >
          {i}
        </div>
      </IonCol>
    );
  }

  let dayToStartForNextMonth = daysOfTheWeek.indexOf(
    lastDayOfMonth.toDateString().slice(0, 3)
  );

  let daysInTheNextMonth = [];

  for (let i = 1; i < 7 - dayToStartForNextMonth && i > 0; i++) {
    daysInTheNextMonth.push(
      <IonCol key={"Next" + i}>
        <div className={`${classes.NextMonth} ion-text-center`}>{i}</div>
      </IonCol>
    );
  }

  let totalDaySlots = [
    ...previousMonthDays,
    ...daysInTheMonth,
    ...daysInTheNextMonth,
  ];

  let fillDaySlots = totalDaySlots.map((day) => {
    return <IonCol key={day.key}>{day}</IonCol>;
  });

  let widthStyle = "60%";

  if (isPlatform("android") || isPlatform("ios")) {
    widthStyle = "100%";
  }

  let openShownYear = [classes.CurrentYear /*, classes.Close*/];

  if (currentYear !== new Date().getFullYear()) {
    openShownYear = [classes.CurrentYear /*, classes.Open */];
  }

  return (
    <React.Fragment>
      <IonHeader className="ion-text-center">
        <IonToolbar color="primary">
          <div className={classes.MonthHeader}>
            <IonButtons>
              <IonButton onClick={previousMonthClickHandler}>
                <IonIcon icon={chevronBackOutline} slot="icon-only" />
              </IonButton>
            </IonButtons>
            <h1
              style={{
                marginLeft: "35px",
                marginRight: "35px",
                marginBottom: "18px",
              }}
            >
              {monthPresented}
            </h1>
            <IonButtons>
              <IonButton slot="end" onClick={nextMonthClickHandler}>
                <IonIcon icon={chevronForwardOutline} slot="icon-only" />
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
        <h4
          className={openShownYear.join(" ")}
          style={{ margin: "0", padding: "5px" }}
        >
          {currentYear}
        </h4>
      </IonHeader>
      <IonContent>
        <IonGrid style={{ width: `${widthStyle}` }}>
          <IonRow className="ion-margin">{loop}</IonRow>
          <IonRow className={`ion-margin`}>{fillDaySlots.slice(0, 7)}</IonRow>
          <IonRow className={`ion-margin`}>{fillDaySlots.slice(7, 14)}</IonRow>
          <IonRow className={`ion-margin`}>{fillDaySlots.slice(14, 21)}</IonRow>
          <IonRow className={`ion-margin`}>{fillDaySlots.slice(21, 28)}</IonRow>
          <IonRow className={`ion-margin`}>{fillDaySlots.slice(28, 35)}</IonRow>
          <IonRow className={`ion-margin`}>{fillDaySlots.slice(35)}</IonRow>
        </IonGrid>
      </IonContent>
    </React.Fragment>
  );
};

export default Calendar;
