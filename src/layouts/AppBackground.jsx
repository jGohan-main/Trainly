import React from "react";

const AppBackground = ({ children, darkMode }) => {
    return (
        <div
            className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#09090b] text-white" : "bg-[#f9fbff] text-zinc-900"
                }`}
        >
            <div
                className={`absolute inset-0 ${darkMode
                    ? "bg-[linear-gradient(135deg,#09090b_0%,#111827_35%,#0f172a_70%,#020617_100%)]"
                    : "bg-[linear-gradient(135deg,#fbfdff_0%,#f1f6ff_34%,#f7f2ff_68%,#f8fbff_100%)]"
                    }`}
            />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className={`absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full blur-[120px] ${darkMode ? "bg-blue-500/10" : "bg-blue-300/25"
                        }`}
                />
                <div
                    className={`absolute top-[10%] right-[-8rem] h-[30rem] w-[30rem] rounded-full blur-[130px] ${darkMode ? "bg-violet-500/10" : "bg-violet-300/20"
                        }`}
                />
                <div
                    className={`absolute bottom-[-8rem] left-[18%] h-[24rem] w-[24rem] rounded-full blur-[110px] ${darkMode ? "bg-cyan-500/10" : "bg-sky-200/20"
                        }`}
                />
            </div>

            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default AppBackground;