import React, { useEffect, useState } from "react";
import { Box, IconButton, Spinner, Text, useMediaQuery } from "native-base";
import { CodeIcon } from "../../assets/Icons";
import { LandscapeIcon } from "../../assets/Icons";
import { HomeIcon } from "../../assets/Icons";
import { NavWidget } from "../../../components(native)/NavWidget";
import { TaskList } from "../../../components(native)/TaskList";
import { AlertOverlay } from "../../../components(native)/AlertOverlay";
import { NewTaskForm } from "../../../components(native)/NewTaskForm";
import { ChoiceModal } from "../../../components(native)/ChoiceModal";

export const TaskScreen = ({ closeApp, viewCode, navigate, propData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [isMobileDevice] = useMediaQuery({ maxWidth: 500 });
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      const taskData = localStorage.getItem("taskData");
      if (taskData) {
        resolve(JSON.parse(taskData));
      } else {
        reject("No data found in local storage");
      }
    });
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setTaskData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showModal]);

  const saveTimeData = (timeData, taskName) => {
    const newData = [...taskData];

    const taskObj = newData[0].data.find(
      (task) => task.task.toLowerCase() === taskName.toLowerCase()
    );

    if (timeData.completed) {
      taskObj.touched = timeData;
      const index = newData[0].data.indexOf(taskObj);
      newData[0].data.splice(index, 1);
      newData[1].data.unshift(taskObj);
    } else {
      if (taskObj.touched) {
        taskObj.touched.resumeFromInterval += timeData.resumeFromInterval;
        taskObj.touched.total += timeData.total;
        taskObj.touched.completed = timeData.completed;
      }
      taskObj.touched = timeData;
    }

    setTaskData(...newData);
    localStorage.setItem("taskData", JSON.stringify(newData));
  };

  const handleTaskAdd = (task, setErrorState) => {
    if (!task.task) {
      setErrorState("Task is empty");
      return;
    }
    // make copy of taskdata
    const updatedTaskList = [...taskData];
    // check for duplicate task
    const taskExists = updatedTaskList[0].data.some(
      (existingTask) =>
        existingTask.task.toLowerCase() === task.task.toLowerCase()
    );
    if (taskExists) {
      setErrorState("Task already exists!");
      return;
    }
    updatedTaskList[0].data.unshift(task);
    localStorage.setItem("taskData", JSON.stringify(updatedTaskList));
    setTaskData(updatedTaskList);
    setShowForm(false);
  };

  const handleTaskPress = (task) => {
    navigate("Timer", { task, saveTimeData });
  };

  const handleTaskArchive = (taskName) => {
    // Make a copy of taskData
    const updatedTaskList = [...taskData];

    // Find the index of the task in the "todo" array
    const taskIndex = updatedTaskList[0].data.findIndex(
      (task) => task.task.toLowerCase() === taskName.toLowerCase()
    );

    // Remove the task from the "todo" array and add it to the "archive" array (findIndex returns -1 if not found)
    if (taskIndex !== -1) {
      const taskToArchive = updatedTaskList[0].data.splice(taskIndex, 1)[0];

      // give completed properties
      const touched = {
        completed: true,
        total: 25 * 60 * taskToArchive.intervals,
      };

      taskToArchive.touched = touched;
      updatedTaskList[1].data.push(taskToArchive);

      // Save the updated copy and update the state
      localStorage.setItem("taskData", JSON.stringify(updatedTaskList));
      setTaskData(updatedTaskList);
    }
  };

  const handleTaskDeletion = (taskNames) => {
    // Make a copy of taskData
    const updatedTaskList = [...taskData];

    taskNames.forEach((taskName) => {
      const taskIndex = updatedTaskList[1].data.findIndex(
        (task) => task.task.toLowerCase() === taskName.toLowerCase()
      );

      // If found, remove the task from the array (findIndex returns -1 if not found)
      if (taskIndex !== -1) {
        updatedTaskList[1].data.splice(taskIndex, 1);
      }
    });

    // Save the updated copy and update the state
    localStorage.setItem("taskData", JSON.stringify(updatedTaskList));
    setTaskData(updatedTaskList);
  };

  // ============== UI triggerables + logic ============== //

  const widgetButtons = [
    <IconButton
      onPress={() => setShowModal(true)}
      icon={<HomeIcon size="35%" />}
      size={"60px"}
      bg={"red.400"}
      borderRadius={"35px"}
    />,
    <IconButton
      onPress={() => {
        isMobileDevice ? setShowAlert(true) : viewCode();
      }}
      icon={<CodeIcon size="35%" />}
      size={"60px"}
      bg={"rgb(215,215,215)"}
      borderRadius={"35px"}
    />,
  ];

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box flex={1}>
      <NavWidget buttons={widgetButtons} />

      {/* Triggered ui elements */}
      <ChoiceModal
        showModal={showModal}
        body="Are you sure you want to exit?"
        confirm="yes"
        deny="no"
        onDeny={() => setShowModal(false)}
        onConfirm={() => {
          closeApp();
          setShowModal(false);
        }}
      />

      <AlertOverlay
        fadeOpacity={0.7}
        visible={showAlert}
        onBodyPress={() => setShowAlert(false)}
      >
        <Text>Put device in landscape mode to continue</Text>
        <LandscapeIcon size="40px" />
      </AlertOverlay>

      <NewTaskForm
        showForm={showForm}
        handleTaskAdd={handleTaskAdd}
        close={() => setShowForm(false)}
      />

      {/* visibile always */}
      <TaskList
        data={taskData}
        setShowForm={setShowForm}
        handleTaskPress={handleTaskPress}
        handleTaskArchive={handleTaskArchive}
        handleTaskDeletion={handleTaskDeletion}
      />
    </Box>
  );
};
