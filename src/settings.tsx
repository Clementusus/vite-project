import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const themes = [
	{
		name: "Domyślny",
		bg: "#ffe0ec",
		bgGradient: "linear-gradient(135deg, #ffe0ec 0%, #fff8f0 100%)",
		accent: "#f7b267",
		text: "#4b3f72",
		sidebar: "#fff8f0",
	},
	{
		name: "Niebieski",
		bg: "#a7c7e7",
		bgGradient: "linear-gradient(135deg, #a7c7e7 0%, #e0ecff 100%)",
		accent: "#4b3f72",
		text: "#22223b",
		sidebar: "#e0ecff",
	},
	{
		name: "Ciemny",
		bg: "#232946",
		bgGradient: "linear-gradient(135deg, #232946 0%, #121629 100%)",
		accent: "#eebbc3",
		text: "#fffffe",
		sidebar: "#121629",
	},
	{
		name: "Miętowy",
		bg: "#e0fff7",
		bgGradient: "linear-gradient(135deg, #e0fff7 0%, #b8fff9 100%)",
		accent: "#38b6ff",
		text: "#1b4965",
		sidebar: "#b8fff9",
	},
	{
		name: "Zielony",
		bg: "#eafbea",
		bgGradient: "linear-gradient(135deg, #eafbea 0%, #d8f3dc 100%)",
		accent: "#38b000",
		text: "#004b23",
		sidebar: "#d8f3dc",
	},
	{
		name: "Pomarańczowy",
		bg: "#fff4e6",
		bgGradient: "linear-gradient(135deg, #fff4e6 0%, #ffe5b4 100%)",
		accent: "#ff8800",
		text: "#7c4700",
		sidebar: "#ffe5b4",
	},
	{
		name: "Fioletowy",
		bg: "#f3e8ff",
		bgGradient: "linear-gradient(135deg, #f3e8ff 0%, #e0c3fc 100%)",
		accent: "#a259f7",
		text: "#3d246c",
		sidebar: "#e0c3fc",
	},
	{
		name: "Różowy",
		bg: "#ffe0f7",
		bgGradient: "linear-gradient(135deg, #ffe0f7 0%, #ffd6ec 100%)",
		accent: "#ff5eae",
		text: "#a4133c",
		sidebar: "#ffd6ec",
	},
];

const Settings: React.FC = () => {
	const [selectedTheme, setSelectedTheme] = useState(
		localStorage.getItem("theme") || "Domyślny"
	);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const theme = themes.find((t) => t.name === selectedTheme) || themes[0];
		document.body.style.background = theme.bg;
		document.body.style.color = theme.text;
		document.body.setAttribute("data-theme", theme.name);
		localStorage.setItem("theme", theme.name);
	}, [selectedTheme]);

	const theme = themes.find((t) => t.name === selectedTheme) || themes[0];

	const handleClearSavedPlans = () => {
		if (
			window.confirm(
				"Czy na pewno chcesz usunąć wszystkie zapisane plany?"
			)
		) {
			localStorage.removeItem("savedTimetables");
			alert("Wszystkie zapisane plany zostały usunięte.");
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				minWidth: "100vw",
				background: theme.bgGradient || theme.bg,
				display: "flex",
				flexDirection: "row",
				alignItems: "flex-start",
				fontFamily: "inherit",
			}}
		>
			{/* Sidebar - always rendered for smooth transition */}
			<div
				style={{
					position: "relative",
					width: 220,
					background: theme.sidebar,
					borderRight: `1px solid ${theme.accent}`,
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
			{/* Main content */}
			<div
				style={{
					flex: 1,
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						background:
							theme.bg === "#232946" ? "#232946" : "#fff", // Use dark bg for dark mode
						borderRadius: "2rem",
						boxShadow: "0 4px 32px rgba(75,63,114,0.10)",
						maxWidth: "500px",
						width: "100%",
						padding: "3rem 2rem",
						textAlign: "center",
						color: theme.text, // Ensure text color is always from theme
					}}
				>
					<h2 style={{ color: theme.text, marginBottom: "0.5rem" }}>
						Ustawienia motywu
					</h2>
					<div
						style={{
							width: "120px",
							height: "8px",
							margin: "0 auto 2rem auto",
							background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.text} 100%)`,
							borderRadius: "4px",
						}}
					/>
					<div style={{ marginTop: "1.5rem" }}>
						<label
							style={{ fontWeight: "bold", color: theme.text }}
						>
							Wybierz motyw:&nbsp;
						</label>
						<select
							value={selectedTheme}
							onChange={(e) => setSelectedTheme(e.target.value)}
							style={{
								padding: "0.5rem 1rem",
								borderRadius: "0.5rem",
								border: `1px solid ${theme.accent}`,
								fontSize: "1rem",
								color: theme.text,
								background: theme.bg,
								fontWeight: "bold",
								marginBottom: "1rem",
							}}
						>
							{themes.map((theme) => (
								<option key={theme.name} value={theme.name}>
									{theme.name}
								</option>
							))}
						</select>
					</div>
					<div style={{ marginTop: "2rem", color: theme.text }}>
						<p>
							Wybrany motyw będzie stosowany na całej stronie i zapamiętany w
							przeglądarce.
						</p>
					</div>
					<button
						onClick={handleClearSavedPlans}
						style={{
							marginTop: "2.5rem",
							background: theme.accent,
							color: "#fff",
							border: "none",
							borderRadius: "0.7rem",
							padding: "0.7rem 2rem",
							fontWeight: "bold",
							fontSize: "1.1rem",
							cursor: "pointer",
							boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
							transition: "background 0.2s",
						}}
					>
						Usuń wszystkie zapisane plany
					</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;