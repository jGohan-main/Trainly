import React, { useState } from "react";
import CreateTask from "../components/TaskComponents/CreateTask";
import TaskList from "../components/TaskList";
import SideNav from "../components/SideNav";
import HistoryList from "../components/TaskComponents/HistoryList";

const Front = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const email = user?.email || "User";

    const [refreshKey, setRefreshKey] = useState(0);
    const [page, setPage] = useState("tasks");

    return (
        <div className="flex min-h-screen bg-zinc-100">
            <SideNav active={page} onSelect={setPage} />

            <main className="flex-1 px-8 py-8">
                <div className="mx-auto max-w-5xl">
                    {page === "tasks" && (
                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-semibold text-zinc-900">
                                        Tasks
                                    </h1>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        Welcome back, {email}
                                    </p>
                                </div>

                                <CreateTask
                                    userId={userId}
                                    onCreated={() => setRefreshKey((k) => k + 1)}
                                />
                            </div>

                            <TaskList
                                userId={userId}
                                refreshKey={refreshKey}
                            />
                        </div>
                    )}

                    {page === "history" && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-semibold text-zinc-900">
                                    History
                                </h1>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Review your archived completed tasks
                                </p>
                            </div>

                            <HistoryList userId={userId} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Front;