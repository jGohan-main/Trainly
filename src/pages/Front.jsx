import React, { useState } from "react";
import LogoutButton from "../components/LogoutButton";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";

const Front = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id; // ✅ use .id not .Id

    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <>
            <CreateTask
                userId={userId}
                onCreated={() => setRefreshKey((k) => k + 1)}
            />

            <TaskList userId={userId} refreshKey={refreshKey} />

            <LogoutButton />
        </>
    );
};

export default Front;