import React, { useState } from "react";
import SideNav from "../components/SideNav";
import CreateTask from "../components/TaskComponents/CreateTaskButton";
import TaskList from "../components/TaskComponents/TaskList";
import HistoryList from "../components/HistoryComponents/HistoryList";
import FinancePage from "../components/FinanceComponents/FinancePage";
import FitnessPage from "../components/FitnessComponents/FitnessPage";
import OverviewPage from "../components/OverviewComponents/OverviewPage";

const FrontPage = () => {
    const [page, setPage] = useState("overview");
    const [refreshKey, setRefreshKey] = useState(0);
    const [collapsed, setCollapsed] = useState(false);

    const renderPage = () => {
        switch (page) {
            case "overview":
                return <OverviewPage />;
            case "tasks":
                return (
                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
                                    Personal Goals
                                </h1>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    Welcome back, User
                                </p>
                            </div>
                            <CreateTask onCreated={() => setRefreshKey((k) => k + 1)} />
                        </div>
                        <TaskList refreshKey={refreshKey} />
                    </div>
                );
            case "homework":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
                                History
                            </h1>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Review your archived completed tasks
                            </p>
                        </div>
                        <HistoryList />
                    </div>
                );
            case "finance":
                return <FinancePage />;
            case "fitness":
                return <FitnessPage />;
            default:
                return <OverviewPage />;
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-transparent">
            {/* BACKGROUND EFFECTS */}
            <div className="pointer-events-none absolute inset-0">
                {/* subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-zinc-50/30 to-transparent dark:from-zinc-950 dark:via-black dark:to-black" />

                {/* blue glow */}
                <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-blue-300/15 blur-[120px] dark:bg-blue-500/10" />

                {/* purple glow */}
                <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-300/15 blur-[120px] dark:bg-purple-500/10" />

                {/* green glow */}
                <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-emerald-300/15 blur-[100px] dark:bg-emerald-500/10" />

                {/* subtle noise overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle,white_1px,transparent_1px)]" />
            </div>

            <SideNav
                active={page}
                onSelect={setPage}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className={`relative px-8 py-8 transition-all duration-300 ${collapsed ? "ml-20" : "ml-72"
                    }`}
            >
                <div className="mx-auto max-w-6xl">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

export default FrontPage;