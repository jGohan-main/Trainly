import React from "react";
import DashboardHero from "./DashboardHero";
import HistoryCard from "./HistoryCard";
import GoalsCard from "./GoalsCard";
import FitnessCard from "./FitnessCard";
import FinanceCard from "./FinanceCard";

function OverviewPage() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="space-y-10">
            <DashboardHero user={user} />

            {/* GOALS */}
            <section className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300/70">
                        Focus
                    </p>
                    <h2 className="text-2xl font-semibold text-blue-300">
                        Your Goals
                    </h2>
                </div>

                <GoalsCard />
            </section>

            {/* TRACKING */}
            <section className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300/70">
                        Tracking
                    </p>
                    <h2 className="text-2xl font-semibold">
                        <span className="text-purple-300">Activity</span>{" "}
                        <span className="text-zinc-400">&</span>{" "}
                        <span className="text-green-300">Systems</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <FitnessCard />
                    <FinanceCard />
                </div>
            </section>

            {/* HISTORY */}
            <section className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300/70">
                        Reflection
                    </p>
                    <h2 className="text-2xl font-semibold text-yellow-300">
                        Recent Activity
                    </h2>
                </div>

                <HistoryCard />
            </section>
        </div>
    );
}

export default OverviewPage;