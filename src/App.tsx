import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const themes = [
    {
        name: "Domyślny",
        bg: "#ffe0ec",
        accent: "#f7b267",
        text: "#4b3f72",
        sidebar: "#fff8f0",
        border: "#a7c7e7",
    },
    {
        name: "Niebieski",
        bg: "#a7c7e7",
        accent: "#4b3f72",
        text: "#22223b",
        sidebar: "#e0ecff",
        border: "#4b3f72",
    },
    {
        name: "Ciemny",
        bg: "#232946",
        accent: "#eebbc3",
        text: "#fffffe",
        sidebar: "#121629",
        border: "#121629",
    },
    {
        name: "Miętowy",
        bg: "#e0fff7",
        accent: "#38b6ff",
        text: "#1b4965",
        sidebar: "#b8fff9",
        border: "#38b6ff",
    },
    {
        name: "Zielony",
        bg: "#eafbea",
        accent: "#38b000",
        text: "#004b23",
        sidebar: "#d8f3dc",
        border: "#38b000",
    },
    {
        name: "Pomarańczowy",
        bg: "#fff4e6",
        accent: "#ff8800",
        text: "#7c4700",
        sidebar: "#ffe5b4",
        border: "#ff8800",
    },
    {
        name: "Fioletowy",
        bg: "#f3e8ff",
        accent: "#a259f7",
        text: "#3d246c",
        sidebar: "#e0c3fc",
        border: "#a259f7",
    },
    {
        name: "Różowy",
        bg: "#ffe0f7",
        accent: "#ff5eae",
        text: "#a4133c",
        sidebar: "#ffd6ec",
        border: "#ff5eae",
    },
];

const imageList = [
    "/image1.png",
    "/image2.png",
    "/image3.png",
    "/image4.png",
    "/image5.png",
    // Add more image paths if needed
];

const App: React.FC = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [theme, setTheme] = useState(themes[0]);
    const [currentImage, setCurrentImage] = useState(imageList[0]);

    useEffect(() => {
        const themeName = localStorage.getItem("theme") || "Domyślny";
        const found = themes.find((t) => t.name === themeName) || themes[0];
        setTheme(found);
    }, []);

    const handleNext = () => {
        navigate("/nowyplan");
    };

    const handleImageClick = () => {
        let nextImage;
        do {
            nextImage = imageList[Math.floor(Math.random() * imageList.length)];
        } while (nextImage === currentImage && imageList.length > 1);
        setCurrentImage(nextImage);
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                minHeight: "100vh",
                minWidth: "100vw",
                background: theme.bg,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
            }}
        >
            {sidebarOpen && (
                <div
                    style={{
                        position: "relative",
                        width: 220,
                        background: theme.sidebar,
                        borderRight: `1px solid ${theme.border}`,
                        minHeight: "100vh",
                        boxShadow: "2px 0 8px rgba(75,63,114,0.03)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "2rem 1rem",
                        zIndex: 2,
                        transition:
                            "transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1)",
                        transform: sidebarOpen ? "translateX(0)" : "translateX(-240px)",
                        opacity: sidebarOpen ? 1 : 0,
                        pointerEvents: sidebarOpen ? "auto" : "none",
                    }}
                >
                    {/* Top section */}
                    <div
                        style={{
                            width: "100%",
                            marginBottom: "2.5rem",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="/image1.png"
                            alt="Logo"
                            style={{
                                width: "54px",
                                height: "54px",
                                objectFit: "contain",
                                marginBottom: "0.5rem",
                                marginTop: "-1rem",
                            }}
                        />
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                color: theme.text,
                                marginBottom: "0.2rem",
                                letterSpacing: "1px",
                            }}
                        >
                            Planer zadań
                        </div>
                        <div
                            style={{
                                fontSize: "0.95rem",
                                color: theme.text,
                                fontStyle: "italic",
                                opacity: 0.7,
                            }}
                        >
                            created by Anna Korzeniewska 53522
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: -18,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            border: `1px solid ${theme.accent}`,
                            background: "#fff",
                            color: theme.text,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
                            zIndex: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            transition: "right 0.2s",
                        }}
                        title="Ukryj panel"
                    >
                        ←
                    </button>
                    <nav style={{ marginTop: "2.5rem", width: "100%" }}>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            <li
                                style={{
                                    marginBottom: "1.5rem",
                                    fontWeight: "bold",
                                    color: theme.accent,
                                }}
                            >
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: theme.accent,
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        padding: 0,
                                    }}
                                    onClick={() => navigate("/")}
                                >
                                    Strona główna
                                </button>
                            </li>
                            <li style={{ marginBottom: "1.5rem", color: theme.text }}>
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: theme.text,
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        padding: 0,
                                    }}
                                    onClick={() => navigate("/saved")}
                                >
                                    Moje zadania
                                </button>
                            </li>
                            <li style={{ marginBottom: "1.5rem", color: theme.text }}>
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: theme.text,
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        padding: 0,
                                    }}
                                    onClick={() => navigate("/settings")}
                                >
                                    Ustawienia
                                </button>
                            </li>
                            <li
                                style={{
                                    marginBottom: "1.5rem",
                                    color: theme.accent,
                                    fontWeight: "bold",
                                }}
                            >
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: theme.accent,
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        padding: 0,
                                    }}
                                    onClick={() => navigate("/nowyplan")}
                                >
                                    Nowy plan
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    style={{
                        position: "fixed",
                        top: 28,
                        left: 0,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: `1px solid ${theme.accent}`,
                        background: "#fff",
                        color: theme.text,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        marginLeft: "4px",
                    }}
                    title="Pokaż panel"
                >
                    →
                </button>
            )}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "transparent",
                }}
            >
                <div
                    style={{
                        background: "transparent",
                        padding: "3rem 2rem",
                        borderRadius: "2rem",
                        boxShadow: "none",
                        maxWidth: "600px",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            margin: "0 auto 2rem auto",
                            overflow: "hidden",
                            borderRadius: "0",
                            boxShadow: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "transparent",
                        }}
                    >
                        <img
                            src={currentImage}
                            alt="Cosy"
                            style={{
                                width: "100%",
                                height: "40%",
                                maxHeight: "240px",
                                minHeight: "100px",
                                display: "block",
                                objectFit: "contain",
                                objectPosition: "center",
                                background: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={handleImageClick}
                        />
                    </div>
                    <h1
                        style={{
                            fontSize: "2rem",
                            marginBottom: "2rem",
                            color: theme.text,
                        }}
                    >
                        Witaj w aplikacji umożliwiającej tworzenie planera zadań. Miłego
                        planowania!
                    </h1>
                    <button
                        onClick={handleNext}
                        style={{
                            fontSize: "1.2rem",
                            padding: "3% 8%",
                            borderRadius: "1rem",
                            border: "none",
                            background: theme.accent,
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "background 0.2s",
                            width: "60%",
                            minWidth: "120px",
                            maxWidth: "320px",
                            margin: "0 auto",
                            display: "block",
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        Przejdź dalej
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
