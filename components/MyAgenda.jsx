import React from "react";
import { View, Text } from "react-native";
import { Agenda } from "react-native-calendars";

const MyAgenda = () => {
  // Specify theme properties to override specific styles for calendar parts. Default = {}
  const CALENDAR_THEME = {
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    textSectionTitleDisabledColor: "#d9e1e8",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#00adf5",
    dayTextColor: "#2d4150",
    textDisabledColor: "#d9e1e8",
    dotColor: "#00adf5",
    selectedDotColor: "#ffffff",
    arrowColor: "orange",
    disabledArrowColor: "#d9e1e8",
    monthTextColor: "blue",
    indicatorColor: "blue",
    // textDayFontFamily: "monospace",
    // textMonthFontFamily: "monospace",
    // textDayHeaderFontFamily: "monospace",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "300",
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
  };

  // Specify how each date should be rendered. day can be undefined if the item is not first in that day
  const renderEmptyDay = () => {
    return <View />;
  };

  //returns card for empty slots.
  const renderEmptyItem = () => {
    return <Text>No slots in the calendar</Text>;
  };

  // Specify how each item should be rendered in the agenda
  const renderItems = (item, firstItemInDay) => {
    return <View />;
  };

  return (
    <View>
      <Agenda
        // The list of items that have to be displayed in the Agenda
        items={{
          "2022-05-22": [{ name: "item 1" }],
          "2022-05-23": [{ name: "item 2" }],
          "2022-05-24": [],
          "2022-05-25": [{ name: "item 3" }],
        }}
        renderDay={renderEmptyDay}
        renderEmptyData={renderEmptyItem}
        renderItem={renderItems}
        scrollEnabled={false}
        selected={new Date().toString()} //Initially selected day
        hideKnob={true} // Hide knob button. Default = false
        showClosingKnob // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        // theme={{
        //   ...CALENDAR_THEME,
        // }}
      />
    </View>
  );
};

export default MyAgenda;
