// import { useState, useEffect } from "react";
// import { Box, Text, Grid } from "@chakra-ui/react";
// import {
//   format,
//   addMonths,
//   subMonths,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   isSameMonth,
//   isSameDay,
// } from "date-fns";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
 
// function TrainerCalendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [holidays, setHolidays] = useState([]);
 
//   // Replace with your Google API Key
//   const API_KEY = "AIzaSyBs47_is0nO9Dlk1BjZtOtR0afsP2moe90";
//   const CALENDAR_ID = "en.indian#holiday@group.v.calendar.google.com";
 
//   // Fetch holidays using Google Calendar API
//   useEffect(() => {
//     const fetchHolidays = async () => {
//       const yearStart = `${currentDate.getFullYear()}-01-01T00:00:00Z`;
//       const yearEnd = `${currentDate.getFullYear()}-12-31T23:59:59Z`;
//       const url = `https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyBs47_is0nO9Dlk1BjZtOtR0afsP2moe90`;
 
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         if (data.items) {
//           const formattedHolidays = data.items.map((event) => ({
//             date: new Date(event.start.date || event.start.dateTime),
//             name: event.summary,
//           }));
//           setHolidays(formattedHolidays);
//           console.log("Fetched Holidays:", formattedHolidays);
//         }
//       } catch (error) {
//         console.error("Error fetching holidays:", error);
//       }
//     };
 
//     fetchHolidays();
//   }, [currentDate]);
 
//   const handlePrevMonth = () => {
//     setCurrentDate(subMonths(currentDate, 1));
//   };
 
//   const handleNextMonth = () => {
//     setCurrentDate(addMonths(currentDate, 1));
//   };
 
//   const renderHeader = () => (
//     <Box display="flex" justifyContent="space-between" alignItems="center" mb={7}>
//       <Box onClick={handlePrevMonth} cursor="pointer">
//         <FiChevronLeft size={24} />
//       </Box>
 
//       <Text fontSize="sm" fontWeight="bold" color="brand.cardTitle">
//         {format(currentDate, "MMMM yyyy")}
//       </Text>
 
//       <Box onClick={handleNextMonth} cursor="pointer">
//         <FiChevronRight size={24} />
//       </Box>
//     </Box>
//   );
 
//   const renderDaysOfWeek = () => {
//     const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
 
//     return (
//       <Grid templateColumns="repeat(7, 1fr)" mb={2}>
//         {daysOfWeek.map((day) => (
//           <Text
//             key={day}
//             fontSize="xs"
//             textAlign="center"
//             color="gray.500"
//             fontWeight="bold"
//           >
//             {day}
//           </Text>
//         ))}
//       </Grid>
//     );
//   };
 
//   const renderCells = () => {
//     const monthStart = startOfMonth(currentDate);
//     const monthEnd = endOfMonth(currentDate);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);
//     const today = new Date();
 
//     const rows = [];
//     let days = [];
//     let day = startDate;
 
//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const isHoliday = holidays.some((holiday) =>
//           isSameDay(holiday.date, day)
//         );
//         const cloneDay = day;
 
//         days.push(
//           <Box
//             key={day}
//             variant="ghost"
//             bg={
//               isSameDay(day, today)
//                 ? "#0F7790"
//                 : isHoliday
//                 ? "gray.500"
//                 : isSameMonth(day, monthStart)
//                 ? "white"
//                 : "gray.100"
//             }
//             color={
//               isHoliday
//                 ? "white"
//                 : isSameDay(day, today)
//                 ? "white"
//                 : isSameMonth(day, monthStart)
//                 ? "black"
//                 : "gray.400"
//             }
//             borderRadius="full"
//             width="30px"
//             height="30px"
//             mt={6}
//             onClick={() => {
//               const holidayName = holidays.find((holiday) =>
//                 isSameDay(holiday.date, cloneDay)
//               )?.name;
//               if (holidayName) alert(`Holiday: ${holidayName}`);
//             }}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             ml={2}
//             fontSize="16"
//           >
//             {format(day, "d")}
//           </Box>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(
//         <Grid templateColumns="repeat(7, 1fr)" mb={1} key={day}>
//           {days}
//         </Grid>
//       );
//       days = [];
//     }
//     return <Box>{rows}</Box>;
//   };
 
//   return (
//     <Box
//       bg="white"
//       borderRadius="25"
//       p={4}
//       shadow="md"
//       border="1px solid"
//       borderColor="gray.200"
//       w="100%"
//       boxShadow="0 4px 6px rgba(180, 219, 220, 0.1)"
//     >
//       {renderHeader()}
//       {renderDaysOfWeek()}
//       {renderCells()}
//     </Box>
//   );
// }
 
// export default TrainerCalendar;
 

import { useState, useEffect } from "react";
import { Row, Col, Button, Typography, Card } from "antd";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const { Text } = Typography;

function CalenderData() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);

  // Replace with your Google API Key
  const API_KEY = "AIzaSyBs47_is0nO9Dlk1BjZtOtR0afsP2moe90";
  const CALENDAR_ID = "en.indian#holiday@group.v.calendar.google.com";

  // Fetch holidays using Google Calendar API
  useEffect(() => {
    const fetchHolidays = async () => {
      const yearStart = `${currentDate.getFullYear()}-01-01T00:00:00Z`;
      const yearEnd = `${currentDate.getFullYear()}-12-31T23:59:59Z`;
      const url = `https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyBs47_is0nO9Dlk1BjZtOtR0afsP2moe90`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
          const formattedHolidays = data.items.map((event) => ({
            date: new Date(event.start.date || event.start.dateTime),
            name: event.summary,
          }));
          setHolidays(formattedHolidays);
          console.log("Fetched Holidays:", formattedHolidays);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderHeader = () => (
    <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
      <Col>
        <Button icon={<FiChevronLeft size={24} />} onClick={handlePrevMonth} />
      </Col>

      <Col>
        <Text strong style={{ fontSize: "16px", color: "#333" }}>
          {format(currentDate, "MMMM yyyy")}
        </Text>
      </Col>

      <Col>
        <Button icon={<FiChevronRight size={24} />} onClick={handleNextMonth} />
      </Col>
    </Row>
  );

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 10 }}>
        {daysOfWeek.map((day) => (
          <Col key={day} span={3} style={{ textAlign: "center" }}>
            <Text style={{ fontSize: "12px", fontWeight: "bold", color: "#999" }}>{day}</Text>
          </Col>
        ))}
      </Row>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isHoliday = holidays.some((holiday) => isSameDay(holiday.date, day));
        const cloneDay = day;

        days.push(
          <Col key={day} span={3} style={{ textAlign: "center", marginTop: "22px" }}>
            <Card
              style={{
                backgroundColor:
                  isSameDay(day, today)
                    ? "#6d8f62"
                    : isHoliday
                    ? "#F8B940"
                    : isSameMonth(day, monthStart)
                    ? "#ffffff"
                    : "#f0f0f0",
                color:
                  isHoliday
                    ? "#ffffff"
                    : isSameDay(day, today)
                    ? "#ffffff"
                    : isSameMonth(day, monthStart)
                    ? "#000000"
                    : "#d3d3d3",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
                fontSize: "10px",
                wordBreak: "keep-all"
              }}
              onClick={() => {
                const holidayName = holidays.find((holiday) =>
                  isSameDay(holiday.date, cloneDay)
                )?.name;
                if (holidayName) alert(`Holiday: ${holidayName}`);
              }}
            >
              <Text>{format(day, "d")}</Text>
            </Card>
          </Col>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Row gutter={[16, 16]} key={day}>
          {days}
        </Row>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        height: "478px",
        width: "420px",
        marginBottom:"14px"
        
      }}
    >
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </Card>
  );
}

export default CalenderData;
