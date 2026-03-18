import React from "react";

const AppBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f9fbff] dark:bg-[#09090b]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#fbfdff_0%,#f1f6ff_34%,#f7f2ff_68%,#f8fbff_100%)] dark:bg-[linear-gradient(135deg,#09090b_0%,#111827_35%,#0f172a_70%,#020617_100%)]" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-blue-300/25 blur-[120px] dark:bg-blue-500/10" />
                <div className="absolute top-[10%] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-violet-300/20 blur-[130px] dark:bg-violet-500/10" />
                <div className="absolute bottom-[-8rem] left-[18%] h-[24rem] w-[24rem] rounded-full bg-sky-200/20 blur-[110px] dark:bg-cyan-500/10" />
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:72px_72px] dark:opacity-[0.06] dark:[background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default AppBackground;